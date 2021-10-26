import React, { useEffect, useState } from 'react';
import { SceneContainer } from '@antv/dipper-component';
import { IConfig } from '@antv/dipper-core';

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
          value: '区代指挥地图',
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
        children: [],
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
      <SceneContainer<IInitData> cfg={mapConfig!} />
    </div>
  );
}
