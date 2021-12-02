import { IConfig } from './IConfigService';
export const defaultConfig: Partial<IConfig> = {
  headerbar: {
    display: true,
    url: './',
    logo: {
      display: true,
      value: 'https://antv-2018.alipay.com/assets/image/icon/l7.svg',
      style: {
        height: '24px',
        width: '24px',
      },
    },
    title: {
      value: 'XX 管理系统',
      display: true,
    },
    children: [],
  },
  toolbar: {
    display: false,
    children: [],
  },
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
  panel: {},
  controls: [
    {
      display: true,
      position: 'topleft',
      type: 'mapStyle',
      title: '地图样式',
    },
    {
      display: true,
      position: 'bottomright',
      type: 'location',
      title: '定位',
    },
  ],
  defaultcontrols: [
    {
      type: 'zoom',
      position: 'bottomright',
      display: true,
    },
    {
      type: 'scale',
      position: 'bottomleft',
      display: true,
    },
  ],
  popup: {
    enable: false,
  },
  layers: [],
  legends: [],
};
