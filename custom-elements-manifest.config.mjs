import { cemValidatorPlugin } from "@wc-toolkit/cem-validator";
import { modulePathResolverPlugin } from "@wc-toolkit/module-path-resolver";

const resolveComponentModulePath = (modulePath) => {
  if (modulePath.includes('/components/')) {
    const fileName = modulePath.split('/').pop()?.replace(/\.ts$/, '.js');
    return fileName ? `./dist/${fileName}` : './dist/wcds.js';
  }

  return './dist/wcds.js';
};

const resolveComponentTypePath = (modulePath) => {
  if (modulePath.includes('/components/')) {
    const fileName = modulePath.split('/').pop()?.replace(/\.ts$/, '.d.ts');
    return fileName ? `./dist/components/${fileName}` : './dist/index.d.ts';
  }

  return './dist/index.d.ts';
};

// custom-elements-manifest.config.mjs
export default {
  globs: ['src/components/**/*.ts'],
  litelement: true,
  plugins: [
    {
      name: 'readme',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.readme = './README.md'
      },
    },
    {
      name: 'schemaVersion',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.schemaVersion = '2.1.0';
      },
    },
    modulePathResolverPlugin({
      modulePathTemplate: (modulePath) => resolveComponentModulePath(modulePath),
      definitionPathTemplate: (modulePath) => resolveComponentModulePath(modulePath),
      typeDefinitionPathTemplate: (modulePath) => resolveComponentTypePath(modulePath),
    }),
    cemValidatorPlugin({
      logErrors: true,
    }),
  ],
};