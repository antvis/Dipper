import { defineConfig } from 'dumi';
const logo = 'https://antv-2018.alipay.com/assets/image/icon/l7.svg';
export default defineConfig({
  title: 'Dipper',
  favicon: logo,
  logo,
  outputPath: 'docs-dist',
  publicPath: '/Dipper/',
  base: '/Dipper/',
  headScripts: ["localStorage.setItem('dumi:prefers-color', 'light')"],
  // more config: https://d.umijs.org/config
});
