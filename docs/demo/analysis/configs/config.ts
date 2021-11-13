import { IConfig, SingleSequentialColorScale } from '@antv/dipper';
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
        value: [330000, 330100],
      },
    },
  },
  headerbar: {
    display: true,
    logo: {
      display: true,
      value:
        'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*ObVJT4IxmlkAAAAAAAAAAAAAARQnAQ',
      style: {
        height: '24px',
        width: '24px',
      },
    },
    title: {
      value: '数据分析',
      display: true,
    },
    children: [
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
        display: true,
        position: 'left',
        title: '活动',
        type: 'activity'
      },
      {
        display: true,
        position: 'left',
        title: '状态',
        type: 'status'
      },
      {
        display: true,
        position: 'left',
        title: '地图展示',
        type: 'mapExhibit'
      },
      {
        display: true,
        position: 'right',
        type: 'save',
        event: {
          actionType: 'map',
          action: 'publish',
        },
      },
      {
        display: true,
        position: 'right',
        type: 'publishbar',
        event: {
          actionType: 'map',
          action: 'publish',
        },
      }
    ],
  },
  panel: {
    display: true,
    enableToggle: true,
    defaultTitle: '所有网格',
    opened: true,
    width: 360,
    position: 'right',
    children: [
      {
        display: true,
        type: 'mesh_indicator',
        title: '数据查看',
      }
    ],
  },
  toolbar: {
    display: true,
    children: [
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
        display: true,
        position: 'left',
        type: 'searchPlaces',
        title: '地区搜索',
      },
    ],
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
      position: 'bottomright',
      type: 'location',
      title: '定位',
    },
    {
      display: true,
      position: 'topleft',
      type: 'mapStyle',
      title: '地图样式',
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
      options: {
        label: {
          field: 'name',
          size: 12,
          color: '#000',
        },
        fill: {
          field: 'unit_price',
          color: SingleSequentialColorScale.Blue,
          bandNum: 5,
          scale: 'quantile',
          unknownName: '无类型',
        },
      },
    },
  ],
  legends: [],
};
