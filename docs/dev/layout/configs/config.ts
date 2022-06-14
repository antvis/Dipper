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
  toolbar: [
    {
      display: true,
      options: {
        height: 48,
      },
      children: [
        {
          display: true,
          position: 'left',
          type: 'citySelect',
        },
      ],
    },
  ],
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
        type: 'panelTabContent',
        components: [
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
              disabled: true,
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
    options: {
      title: {
        value: '布局测试',
        display: true,
      },
    },
  },
  layers: [
    {
      type: 'poi',
      id: 'poilayer',
      options: {
        autoFit: false,
        zIndex: 10,
        normal: {
          img: {
            field: 'value',
            value: () => {
              return 'poimarker';
            },
          },
          imgSize: 20,
          text: 'name',
          textColor: '#000',
          textSize: 12,
          textStyle: {
            textOffset: [0, -40],
            textAnchor: 'bottom',
            stroke: '#ffffff',
            strokeWidth: 2, // 描边宽度
          },
        },
        image: {
          poimarker:
            'https://gw.alipayobjects.com/mdn/rms_08cc33/afts/img/A*tn2PQahomMIAAAAAAAAAAAAAARQnAQ',
        },
      },
    },
    {
      type: 'aoi',
      id: 'aoilayer',
      options: {
        autoFit: true,
        text: false,
        select: false,
        hover: false,
        multipleSelect: false,
        normal: {
          fillColor: '#1677FF',
          style: {
            opacity: 0.8,
          },
          borderWidth: 2,
          borderColor: '#1677FF',
        },
      },
    },
  ],
  mapType: 'GaodeV1',
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
};
