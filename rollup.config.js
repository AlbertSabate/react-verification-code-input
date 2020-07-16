import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      modules: true,
    }),
    url(),
    nodeResolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/env', { "modules": false }],
        '@babel/react',
      ],
      plugins: [
        '@babel/proposal-class-properties',
      ],
      babelHelpers: 'bundled',
    }),
    commonjs(),
    copy({
      targets: [{
        src: 'src/index.d.ts',
        dest: pkg.types,
      }],
    }),
  ],
};
