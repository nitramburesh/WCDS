export default {
  /** Globs to analyze: Look for TS files in src */
  globs: ['src/**/*.ts'],
  
  /** Exclude test/stories to keep the output clean */
  exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts'],
  
  /** Output directory */
  outdir: 'dist',
  
  /** Enable Lit specific analysis */
  litelement: true,

};