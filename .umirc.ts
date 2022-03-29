import { join } from 'path';
import { defineConfig } from 'dumi';

const logo = 'https://antv-2018.alipay.com/assets/image/icon/l7.svg';
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'Dipper',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  mode: 'site',
  base: '/',
  publicPath: '/',
  outputPath: 'docs-dist',
  resolve: {
    excludes: isProduction ? ['docs/dev'] : [],
  },
  alias: {
    '@antv/dipper-core': join(__dirname, 'packages', 'core'),
    '@antv/dipper': join(__dirname, 'packages', 'dipper'),
    '@antv/dipper-layout': join(__dirname, 'packages', 'layout'),
    '@antv/dipper-mobile': join(__dirname, 'packages', 'mobile'),
    '@antv/dipper-pc': join(__dirname, 'packages', 'pc'),
    '@antv/dipper-widgets': join(__dirname, 'packages', 'widgets'),
  },
  metas: [
    { name: 'keywords', content: 'dipper, Dipper, L7, AntV, AntV Dipper' },
    { name: 'description', content: '🌍 地理分析应用研发框架' },
  ],
  // Google Analytics
  analytics: isProduction ? { ga: 'G-CBX7JL1Q57' } : false,
  locales: [['zh-CN', '中文']],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/antvis/Dipper',
    },
  ],
  themeConfig: {
    carrier: 'Dipper',
  },
  hash: true,
  // 同步 gh-page CNAME 文件
  copy: isProduction ? ['docs/CNAME'] : [],
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    lodash: '_',
  },
  links: ['https://gw.alipayobjects.com/os/lib/antd/4.16.13/dist/antd.css'],
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.1/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.1/umd/react-dom.development.js',
    'https://gw.alipayobjects.com/os/lib/antd/4.16.13/dist/antd-with-locales.js',
    /** lodash */
    'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
  ],
  // more config: https://d.umijs.org/config
});
