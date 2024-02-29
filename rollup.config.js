import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.BUILD === 'production';

export default {
  input: 'src/app.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: isProduction ? false : 'inline',
    chunkFileNames: '[name]-[hash].js',
    manualChunks(id) {
      if (id.includes('node_modules')) {
        const moduleName = id.split('node_modules/')[2].split('/')[0];
        return moduleName;
      }
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    isProduction && terser(),
  ],
};
