import commonjs from '@rollup/plugin-commonjs';

export default {
  esm: 'rollup',
  cjs: 'rollup',
  cssModules: true,
  runtimeHelpers: true,
  extraRollupPlugins: [commonjs()],
  autoprefixer: {
    browsers: ['IE 11', 'last 2 versions'],
  },
};
