import StyleDictionary from 'style-dictionary';
import { formats } from 'style-dictionary/enums';


const TOKEN_PATH = './src/tokens/generated/';
const sd = new StyleDictionary({
  source: ['./src/tokens/**/*.tokens.json'],

  platforms: {
    css: {
      prefix: 'wcds',
      transformGroup: "css",
      files: [
        {
          destination: `${TOKEN_PATH}design-tokens.css`,
          format: "css/variables",
        },
      ],
    },
    ts: {
      transformGroup: "js",
      files: [
        {
          destination: `${TOKEN_PATH}design-tokens.d.ts`,
          format: 'typescript/module-declarations',
        },
      ],
    },
    js: {
      transformGroup: "js",
      files: [
        {
          destination: `${TOKEN_PATH}design-tokens.js`,
          format: "javascript/esm",
          options: {
            minify: true,
          }

        },

      ],

    }
  },
});

await sd.buildPlatform("css");
await sd.buildPlatform("ts");
await sd.buildPlatform("js");
