import commonjs from '@rollup/plugin-commonjs';
export default {
  esm: 'rollup',
  cjs: 'rollup',
  cssModules: true,
  extraRollupPlugins: [commonjs()],
};
