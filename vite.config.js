import { defineConfig } from 'vite';
import { createRequire } from 'module';
import path from 'path';
import html from '@rollup/plugin-html';
import addAssetHtml from 'add-asset-html-webpack-plugin';
import react from '@vitejs/plugin-react';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    {
      ...html(),
      enforce: 'pre',
      apply: 'build',
    },
    react(),
  ],
  rollupInputOptions: {
    input: './src/index.js',
    plugins: [
      // {
      //   name: 'wasm',
      //   async load(id) {
      //     if (path.extname(id) !== '.wasm') {
      //       return null;
      //     }
      //     const wasmUrl = path.resolve(__dirname, 'public', path.basename(id));
      //     const buffer = await require('fs').promises.readFile(wasmUrl);
      //     const arrayBuffer = new Uint8Array(buffer).buffer;
      //     return `export default new Uint8Array(${JSON.stringify(
      //       Array.from(new Uint8Array(arrayBuffer))
      //     )}).buffer;`;
      //   },
      //   transform(_, id) {
      //     if (path.extname(id) !== '.go') {
      //       return null;
      //     }
      //     return { code: '', moduleSideEffects: 'no-treeshake' };
      //   },
      // },
    ],
  },
  configureWebpack: {
    plugins: [
      // new addAssetHtml({
      //   filepath: path.resolve(__dirname, 'public', 'wasm_exec.js'),
      // }),
    ],
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    envDir: './',
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
