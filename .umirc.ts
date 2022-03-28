import { defineConfig } from 'dumi';

const logo = 'https://antv-2018.alipay.com/assets/image/icon/l7.svg';

export default defineConfig({
  title: 'Dipper',
  mode: 'site',
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/api': [
      {
        title: '指南',
        path: '/api',
        children: [
          // 菜单子项（可选）
          'API/core.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
          'API/config.md',
        ],
      },
    ],
  },
  navs: [
    {
      title: 'API',
      path: '/api',
    },
    {
      title: '教程',
      path: '/tutorials/index',
    },
    {
      title: '模板案例',
      path: '/demo',
    },
  ],
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
