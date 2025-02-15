/// <reference types="vitest" />

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  resolve: {
    conditions: ['node'],
  },
  esbuild: {
    target: 'esnext',
  },
  test: {
    include: ['{src,test}/**/*.test.{mts,ts}'],
    exclude: [...configDefaults.exclude],
    environment: 'node',  // Ensure Node.js test environment
    globals: true,
  },
});
