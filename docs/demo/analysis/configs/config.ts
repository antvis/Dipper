import { IConfig, SingleSequentialColorScale } from '@antv/dipper';
import { CityList } from './mock';
export const config: Partial<IConfig> = {
  global: {
    filterData: [],
    areaCode: '330100',
    view: 'task',
  },
  widgets: {
    citySelect: {
      options: { data: CityList },
      value: ['330000', '330100'],
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
    components: [
      {
        display: true,
        position: 'left',
        title: '选择城市',
        type: 'citySelect',
        event: {
          actionType: 'map',
          action: 'queryArea',
        },
      },
      {
        display: false,
        position: 'right',
        type: 'publishbar',
        event: {
          actionType: 'map',
          action: 'publish',
        },
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
    components: [
      {
        display: true,
        type: 'meshName',
        title: '网格名称',
      },
      {
        display: true,
        type: 'meshchart',
        title: '所有网格数据',
      },
      {
        display: true,
        type: 'panelTabContent',
        title: '所有网格',
        components: [
          {
            display: true,
            type: 'mesh_indicator',
            title: '业务数据',
          },
          {
            type: 'total_data_panel',
            title: '人员数据',
          },
        ],
      },
    ],
  },
  toolbar: {
    display: false,
    components: [],
  },
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
  controls: [
    {
      display: true,
      position: 'topleft',
      layout: 'horizontal',
      type: 'filter',
      title: '筛选',
    },
    {
      display: true,
      position: 'bottomright',
      type: 'location',
      layout: 'vertical',
      title: '定位',
    },
    {
      display: true,
      position: 'bottomright',
      type: 'mapStyle',
      layout: 'vertical',
      title: '地图样式',
    },
    {
      display: true,
      position: 'topleft',
      type: 'searchPlaces',
      layout: 'horizontal',
      title: '地区搜索',
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
  layers: [
    {
      type: 'gridLayer',
      options: {},
    },
  ],
  legends: [],
};
