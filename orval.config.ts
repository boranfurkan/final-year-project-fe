import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: 'http://localhost:4444/api/docs-json',
    output: {
      client: 'react-query',
      target: './src/api/index.ts',
      mode: 'single',
      override: {
        mutator: {
          path: './src/api/AxiosInstance.ts',
          name: 'getAxiosInstance',
        },
      },
    },
  },
});
