import { initWidgets } from './widgets';
import React, { useEffect, useState } from 'react';
import { config } from './config/config';
import { DipperContainer, IConfig } from '@antv/dipper';

interface IInitData {
  areaVOList: any[];
  sceneCode: string;
  areaCode: string;
  filterData: any[];
}

export default function LayerDemo() {
  const [mapConfig, setMapConfig] = useState<IConfig>();
  // 初始化相关数据

  useEffect(() => {
    initWidgets();
    setMapConfig(config);
  }, []);

  return (
    <div style={{ height: '300px' }}>
      <DipperContainer cfg={mapConfig!} />
    </div>
  );
}
