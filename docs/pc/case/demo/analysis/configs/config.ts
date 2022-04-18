import type { IConfig } from '@antv/dipper';
import { SingleSequentialColorScale } from '@antv/dipper';
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
  toolbar: [{
    display: false,
    components: [],
  }],
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
  controls: [
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
    {
      display: true,
      position: 'topleft',
      type: 'select',
      options: {},
    },
  ],
  popup: {
    enable: false,
  },
  layers: [
    {
      type: 'gridLayer',
      options: {
        text: {
          field: 'name',
        },
        normal: {
          fillColor: {
            field: 'unit_price',
            value: [
              'rgb(247, 251, 255)',
              'rgb(222, 235, 247)',
              'rgb(198, 219, 239)',
              'rgb(158, 202, 225)',
              'rgb(107, 174, 214)',
              'rgb(66, 146, 198)',
              'rgb(33, 113, 181)',
              'rgb(8, 81, 156)',
              'rgb(8, 48, 107)',
            ],
          },
          scale: {
            unit_price: {
              type: 'quantile',
            },
          },
          borderWidth: 1,
          borderColor: '#ffffff',
          opacity: 1,
        },
        multipleSelect: true,
      },
    },
  ],
  legends: [],
};
