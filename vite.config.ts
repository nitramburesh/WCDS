/** @format */

/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import dts from 'vite-plugin-dts';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/tests/**', 'src/**/*.stories.ts'],
      tsconfigPath: 'tsconfig.build.json',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'wcds',
      formats: ['es'],
      fileName: 'wcds',
    },
    rollupOptions: {
      external: [/^lit(\/|$)/, /^@lit\//],
      output: {
        globals: {
          lit: 'lit',
        },
      },
    },
    copyPublicDir: false,
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['src/tests/**/*.test.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
