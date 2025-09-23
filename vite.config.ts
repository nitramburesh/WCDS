/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "wcds",
      formats: ["es"],
      fileName: "wcds.js",
    },
    rollupOptions: {
      external: ["lit"],
      output: {
        globals: {
          lit: "lit",
        },
      },
    },
    copyPublicDir: false,
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
