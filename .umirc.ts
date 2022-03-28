import { defineConfig } from 'dumi';

const logo = 'https://antv-2018.alipay.com/assets/image/icon/l7.svg';

export default defineConfig({
  title: 'Dipper',
  favicon: logo,
  logo,
  mode: 'site',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/antvis/Dipper',
    },
  ],
  outputPath: 'docs-dist',
  publicPath: '/Dipper/',
  base: '/Dipper/',
  headScripts: ["localStorage.setItem('dumi:prefers-color', 'light')"],
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
