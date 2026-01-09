
// import { customElementVsCodePlugin } from "custom-element-vs-code-integration";

// const options = {

// };

// export default {
//   plugins: [
//     customElementVsCodePlugin(options)
//   ],
// };

import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';

export default {
  /** Globs to analyze: Look for TS files in src */
  globs: ['src/**/*.ts'],
  
  /** Exclude test/stories to keep the output clean */
  exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts'],
  
  /** Output directory */
  outdir: 'dist',
  
  /** Enable Lit specific analysis */
  litelement: true,
  
  plugins: [
    customElementVsCodePlugin({
      // 🟢 The path where the JSON file will be generated
      outdir: 'dist',
      
      // 🟢 The name of the file (Standard name for VS Code)
      htmlFileName: 'vscode.html-data.json',
      
      // 🟢 (Optional) If you have CSS custom properties (variables)
      cssFileName: 'vscode.css-data.json',
    }),
  ],
};