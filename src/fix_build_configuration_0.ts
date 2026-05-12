import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
  external: ['react'],
  bundle: true,
  target: 'es2020',
});
