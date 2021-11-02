export const config = {
  initData: {
    filterData: [],
    areaVOList: [
      {
        value: '330000',
        areaLevel: 'province',
        label: '浙江省',
        children: [
          {
            value: '330100',
            areaLevel: 'province',
            label: '杭州市',
            children: [],
          },
        ],
      },
      {
        value: '130000',
        areaLevel: 'province',
        label: '河北省',
        children: [
          {
            value: '130100',
            areaLevel: 'province',
            label: '石家庄市',
            children: [],
          },
          {
            value: '130200',
            areaLevel: 'province',
            label: '唐山市',
            children: [],
          },
        ],
      },
    ],
    sceneCode: 'iot_terminal_dominant',
    areaCode: '330100',
    view: 'task',
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
      type: 'img',
    },
    title: {
      value: '区代指挥中心',
      display: true,
      type: 'text',
    },
    children: [
      {
        display: true,
        position: 'left',
        title: '选择城市',
        type: 'cityselect',
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
            level: 'feature',
            children: [
              {
                children: [
                  {
                    display: true,
                    type: 'indicator',
                    title: '区域详情',
                    event: {
                      actionType: 'indicator',
                      action: 'indicator',
                    },
                  },
                  {
                    display: true,
                    type: 'terminal_task_detail',
                    title: '任务详情',
                    event: {
                      actionType: 'task',
                      action: 'queryTaskDetail',
                    },
                  },
                  {
                    display: true,
                    type: 'trend_distribution',
                    title: '趋势分布',
                    event: {
                      actionType: 'indicator',
                      action: 'queryDensityTrend',
                    },
                  },
                  {
                    display: true,
                    type: 'job_detail',
                    title: '作业明细',
                    event: {
                      actionType: 'indicator',
                      action: 'queryJobDetails',
                    },
                  },
                ],
                title_display: 'false',
                display: true,
                type: 'mesh_indicator',
                title: '数据查看',
              },
            ],
            level_key:
              'iot_terminal_dominant$task$2021102300077947$2021102300073562',
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
      "display": true,
      "position": "topleft",
      "type": "mapStyle",
      "event": {
        "actionType": "render",
        "action": "changeStyle"
      },
      options: [
        { label: 'normal', value: 'normal' },
        { label: '白天', value: 'light' },
        { label: '黑夜', value: 'dark' },
        { label:' 无底图',value:'blank'}
      ],
      "title": "地图样式",
    }
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
          field: 'value',
          unknownName: '无类型',
        },
      },
    },
  ],
  legends: [],
};
