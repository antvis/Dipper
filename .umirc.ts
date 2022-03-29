import { defineConfig } from 'dumi';

const logo = 'https://antv-2018.alipay.com/assets/image/icon/l7.svg';
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'Dipper',
  favicon: logo,
  logo,
  mode: 'site',
  outputPath: 'docs-dist',
  publicPath: '/dipper/',
  base: '/dipper/',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/antvis/Dipper',
    },
  ],
  resolve: {
    excludes: isProduction ? ['docs/dev'] : [],
  },
  analytics: {
    // Google Analytics 代码，配置后会启用
    ga: 'G-CBX7JL1Q57',
  },
  themeConfig: {
    carrier: 'Dipper',
  },
  locales: [['zh-CN', '中文']],
  // more config: https://d.umijs.org/config
});
