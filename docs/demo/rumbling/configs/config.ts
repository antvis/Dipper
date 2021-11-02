import { IConfig, ScatterColorScale } from '@antv/dipper';
import { CityList } from './mock';
export const config: Partial<IConfig> = {
  viewData: {
    global: {
      filterData: [],
      sceneCode: 'iot_terminal_dominant',
      areaCode: '330100',
      view: 'task',
    },
    widgets: {
      citySelect: {
        options: CityList,
        value: {},
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
      value: '区代指挥中心',
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
        options: [
          {
            label: '热区分析',
            value: 'hotspot',
          },
          {
            label: '任务管理',
            value: 'task',
          },
        ],
        position: 'center',
        type: 'navibar',
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
  sidebar: {
    display: true,
    enableToggle: true,
    defaultTitle: '所有网格',
    opened: true,
    width: 360,
    position: 'right',
    children: [
      {
        type: 'siderbartabcontent',
        title: '所有网格',
        children: [
          {
            display: true,
            type: 'mesh_indicator',
            title: '数据查看',
          },
          {
            type: 'total_data_panel',
            title: '地图面板',
          },
        ],
      },
    ],
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
  controls: [
    {
      display: true,
      position: 'topleft',
      type: 'mapStyle',
      event: {
        actionType: 'render',
        action: 'changeStyle',
      },
      options: [
        { label: 'normal', value: 'normal' },
        { label: '白天', value: 'light' },
        { label: '黑夜', value: 'dark' },
        { label: ' 无底图', value: 'blank' },
      ],
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
          field: 'label',
          size: 12,
          color: '#000',
        },
        fill: {
          field: 'label',
          color: ScatterColorScale,
          unknownName: '无类型',
        },
      },
    },
  ],
  legends: [],
};
