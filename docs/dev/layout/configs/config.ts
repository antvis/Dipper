import type { IConfig } from '@antv/dipper';
import { CityList } from './mock';
export const config: Partial<IConfig> = {
  viewData: {
    global: {
      filterData: [],
      areaCode: '330100',
      view: 'task',
    },
    widgets: {
      citySelect: {
        options: CityList,
        value: ['330000', '330100'],
      },
    },
  },
  toolbar: {
    display: true,
    children: [
      {
        display: true,
        position: 'left',
        type: 'citySelect',
      },
    ],
  },
  panel: {
    display: true,
    options: {
      enableToggle: true,
      defaultTitle: '所有网格',
      opened: true,
      width: 426,
    },
    position: 'right',
    children: [
      {
        display: true,
        type: 'panelTabContent',
        children: [
          {
            display: true,
            type: 'mesh_indicator',
            options: {
              title: '任务面板',
            },
          },
          {
            type: 'total_data_panel',
            display: true,
            options: {
              title: '数据分析',
            },
          },
        ],
      },
    ],
  },
  controls: [
    {
      display: true,
      position: 'topleft',
      type: 'location',
      // layout:'horizontal',
      title: '定位',
    },
    {
      display: true,
      position: 'topleft',
      type: 'mapStyle',
      // layout:'horizontal',
      title: '地图样式',
    },
  ],
  headerbar: {
    display: true,
    title: {
      value: '布局测试',
      display: true,
    },
    children: [
      {
        display: true,
        position: 'left',
        type: 'citySelect',
      },
      {
        display: true,
        position: 'center',
        type: 'mapStyle',
      },
      {
        display: true,
        position: 'right',
        type: 'mapStyle',
      },
    ],
  },
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
};
