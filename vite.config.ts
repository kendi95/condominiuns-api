import { defineConfig } from "vitest/config";
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['html'],
      reportsDirectory: resolve(__dirname, 'coverages'),
    },
    alias: [
      {
        find: '@services',
        replacement: './src/services',
      },
      {
        find: '@repositories',
        replacement: './src/repositories',
      },
      {
        find: '@errors',
        replacement: './src/errors',
      },
      {
        find: '@dtos',
        replacement: './src/dtos',
      },
      {
        find: '@domains',
        replacement: './src/domains',
      },
      {
        find: '@database',
        replacement: './src/database',
      },
      {
        find: '@validations',
        replacement: './src/validations',
      },
      {
        find: '@controllers',
        replacement: './src/controllers',
      },
      // {
      //   find: '@middlewares',
      //   replacement: './src/middlewares',
      // },
      // {
      //   find: '@modules',
      //   replacement: './src/modules',
      // },
    ],
  }
})