import fs from "fs";
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const INPUT_FILE = path.resolve(__dirname, "design.tokens.json")

const OUTPUT_DIR = path.resolve(__dirname, "generated");
const CSS_OUTPUT_FILE = path.join(OUTPUT_DIR, "tokens.css");
const TS_OUTPUT_FILE = path.join(OUTPUT_DIR, "tokens.ts");

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

console.log(`🔄 Processing ${INPUT_FILE}...`);

const parseTokens = () => {
  try {
    const inputData = fs.readFileSync(INPUT_FILE, "utf8")
    return JSON.parse(inputData);
  } catch (error) {
    console.error("Error reading or parsing input file:", error);
    process.exit(1)
  }
}

const tokens = parseTokens();

function flatten(object, prefix = [], map = {}) {

  if (typeof object !== "object" || object === null) {
    console.warn("⚠️ Skipping non-object:", object);
    return map;
  }

  for (const [key, value] of Object.entries(object)) {
    try {
      // if object is a token, add it to the map
      if (value && typeof value === "object" && "$value" in value) {
        const name = [...prefix, key].join("-");
        map[name] = value.$value;

        // else if it's a nested object, iterate recursively
      } else if (value && typeof value === "object") {
        flatten(value, [...prefix, key], map);

        // else if it's a primitive value, then fail gracefully
      } else {
        console.error("🚨 Unexpected value type for key:", key, "with value:", value);
        process.exit(1)
      }
    } catch (error) {
      console.error("🚨 Error processing key:", key, "with value:", value, "Error:", error);
      process.exit(1)
    }
  }
  return map;
}

// resolve references like {color.primary.100} to CSS variable or else return value as is
function resolveValueToColorOrCssVariable(value) {
  try {
    // starts and ends with curly braces (is nested token reference)
    const match = /^\{(.+)\}$/;
    if (match.test(value)) {
      const ref = value.replace(/[{}]/g, "").replace(/\./g, "-");
      return `var(--wcds-${ref})`;
    }
    return value;
  } catch (error) {
    console.error("Error resolving value:", error);
    return value;
  }
}

const flattenedTokens = flatten(tokens);



// --- Write CSS file ---

let cssVariablesOutput = ":root {\n";
for (const [name, value] of Object.entries(flattenedTokens)) {
  cssVariablesOutput += `  --wcds-${name}: ${resolveValueToColorOrCssVariable(value)};\n`;
}
cssVariablesOutput += "}\n";

try {
  fs.writeFileSync(CSS_OUTPUT_FILE, cssVariablesOutput);
  console.log("✅ Output is generated in:", CSS_OUTPUT_FILE);
} catch (error) {
  console.error("Error writing output file:", error);
  process.exit(1)
}

function buildReferenceObject(obj, prefix = []) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && "$value" in value) {
      const refName = [...prefix, key].join("-");
      result[key] = `var(--wcds-${refName})`;
    } else if (value && typeof value === "object") {
      result[key] = buildReferenceObject(value, [...prefix, key]);
    }
  }
  return result;
}

const tokensObject = buildReferenceObject(tokens);


// --- Write TS file ---

const tsOutput = `// Auto-generated design tokens mapping
export const tokens = ${JSON.stringify(tokensObject, null, 2)} as const;

export type Tokens = typeof tokens;
`;

try {
  fs.writeFileSync(TS_OUTPUT_FILE, tsOutput);
  console.log(`✅ Token object written to ${TS_OUTPUT_FILE}`);
} catch (error) {
  console.error("❌ Error writing TS file:", error);
  process.exit(1);
}


// --- WRITE DTS FILE ---

const dtsOutput = `// Auto-generated type declarations for design tokens
declare module "*/tokens.css" {
  const classes: { [key: string]: string };
  export default classes;
}
`;

fs.writeFileSync(path.join(OUTPUT_DIR, "tokens-css.d.ts"), dtsOutput);
console.log("✅ Declaration file written.");