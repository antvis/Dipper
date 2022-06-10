import type { IConfig } from '@antv/dipper';
export const config: Partial<IConfig> = {
  viewData: {
    global: {
      filterData: [],
    },
  },
  headerbar: {
    display: true,
    options: {
      title: {
        value: '数据分析',
        display: true,
      },
    },
  },
  panel: {
    display: false,
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
  layers: [
    {
      type: 'gridLayer',
      options: {},
    },
  ],
  legends: [],
};
