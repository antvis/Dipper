import type { IConfig } from '@antv/dipper';
import { DipperContainer } from '@antv/dipper';
import React, { useEffect, useState } from 'react';
import { config } from './config/config';
import { initWidgets } from './widgets';

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
