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
      value: 'XX 管理地图地图',
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
        title: '全部活动',
        type: 'activity',
      },
      {
        display: true,
        position: 'left',
        title: '全部状态',
        type: 'status',
      },
      {
        display: true,
        position: 'left',
        title: '地图展示',
        type: 'mapExhibit',
      },
      {
        display: true,
        position: 'left',
        title: '人员搜索',
        type: 'searchPerson',
      },

      // {
      //   display: true,
      //   options: [
      //     {
      //       label: '热区分析',
      //       value: 'hotspot',
      //     },
      //     {
      //       label: '任务管理',
      //       value: 'task',
      //     },
      //   ],
      //   position: 'center',
      //   type: 'navibar',
      // },
      {
        display: true,
        position: 'right',
        title: '保存',
        type: 'save',
      },
      {
        display: true,
        position: 'right',
        type: 'publishbar',
        title: '发布',
        event: {
          actionType: 'map',
          action: 'publish',
        },
      },
    ],
  },
  panel: {
    display: true,

    position: 'right',
    options: {
      enableToggle: true,
      defaultTitle: '所有网格',
      opened: true,
      width: 426,
    },
    children: [
      {
        display: true,
        type: 'meshName',
        title: '网格名称',
      },
      {
        display: true,
        type: 'activityTask',
        title: '活动任务',
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
      position: 'bottomright',
      type: 'mapStyle',
      title: '地图样式',
    },
    {
      display: true,
      position: 'rightcenter',
      type: 'meshTools',
      title: '网格工具',
    },
    {
      display: true,
      position: 'topleft',
      type: 'searchPlaces',
      title: '地区搜索',
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
          unknownName: '无类型',
          scale: {
            type: 'cat',
            domain: ['C', 'B', 'A'],
          },
        },
      },
    },
  ],
  legends: [],
};
