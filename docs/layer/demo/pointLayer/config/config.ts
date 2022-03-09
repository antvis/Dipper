import { IConfig, SingleSequentialColorScale } from '@antv/dipper';
export const config: Partial<IConfig> = {
  viewData: {
    global: {
      filterData: [],
    },
  },
  headerbar: {
    display: true,
    title: {
      value: '数据分析',
      display: true,
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
    zoom: 2,
    center: [89.094725, 39.032152],
    pitch: 0,
    style: 'normal',
  },
  layers: [
    {
      type: 'pointLayer',
      options: {},
    },
  ],
  legends: [],
};
