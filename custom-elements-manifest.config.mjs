import { cemValidatorPlugin } from "@wc-toolkit/cem-validator";


export default {
  /** Globs to analyze: Look for TS files in src */
  globs: ['src/**/*.ts'],

  /** Exclude test/stories to keep the output clean */
  exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts'],

  /** Enable Lit specific analysis */
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
    cemValidatorPlugin({
      logErrors: true,
    }),
  ],};