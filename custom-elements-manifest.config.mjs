import { cemValidatorPlugin } from "@wc-toolkit/cem-validator";
import { modulePathResolverPlugin } from "@wc-toolkit/module-path-resolver";

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
      modulePathTemplate: () => './dist/wcds.js',
      definitionPathTemplate: () => './dist/wcds.js',
    }),
    cemValidatorPlugin({
      logErrors: true,
    }),
  ],
};