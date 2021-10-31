import React, { useEffect, useState } from 'react';

import {
  DipperContainer,
  IConfig,
  registerWidget,
  SiderBar,
} from '@antv/dipper';
registerWidget('siderbartabcontent', SiderBar);

interface IInitData {
  areaVOList: any[];
  sceneCode: string;
  areaCode: string;
  filterData: any[];
}

// ** 区代指挥中心
export default function HomeMap() {
  const [mapConfig, setMapConfig] = useState<IConfig<IInitData>>();
  useEffect(() => {
    const config = {
      initData: {},
      headerbar: {
        display: true,
        logo: {
          display: true,
          value:
            'https://gw.alipayobjects.com/mdn/rms_08cc33/afts/img/A*mdxPR42J3PUAAAAAAAAAAAAAARQnAQ',
          style: {
            height: '24px',
            width: '24px',
          },
        },
        title: {
          value: '数字化指挥地图',
          display: true,
        },
        children: [],
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
            children: [],
          },
        ],
      },
      toolbar: {
        display: false,
        children: [],
      },
      map: {
        zoom: 10,
        center: [110.153576, 40.287459],
        pitch: 0,
        style: 'normal',
      },
      controls: [],
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
      layers: [],
      legends: [],
    };
    setMapConfig(config);
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <DipperContainer<IInitData> cfg={mapConfig!} />
    </div>
  );
}
