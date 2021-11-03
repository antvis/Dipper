import React, { useEffect, useState } from 'react';

import { DipperContainer, IConfig } from '@antv/dipper';
import { config } from '../demo/rumbling/configs/config';

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
    setMapConfig(config);
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <DipperContainer<IInitData> cfg={mapConfig!} />
    </div>
  );
}
