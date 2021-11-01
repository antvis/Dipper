import commonjs from '@rollup/plugin-commonjs';
export default {
  esm: 'rollup',
  cjs: 'rollup',
  extraRollupPlugins: [
    commonjs({
      namedExports: {
        eventemitter3: ['EventEmitter'],
        // inversify: [ 'inject', 'injectable', 'postConstruct', 'Container', 'decorate', 'interfaces' ],
        // @see https://github.com/rollup/rollup-plugin-commonjs/issues/266
        lodash: [
          'isNil',
          'uniq',
          'clamp',
          'isObject',
          'isFunction',
          'cloneDeep',
          'isString',
          'isNumber',
          'merge',
        ],
      },
      dynamicRequireTargets: [
        'node_modules/inversify/lib/syntax/binding_{on,when}_syntax.js',
      ],
    }),
  ],
};
