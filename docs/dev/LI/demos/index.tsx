import { registerWidget } from '@antv/dipper-core';
import { LIContainer } from '@antv/dipper-pc';
import { ChoroplethLayer } from '@antv/larkmap';
import React from 'react';
import { config } from './configs/config';

registerWidget('ChoroplethLayer', ChoroplethLayer);

export default function AppMap() {
  return (
    <div style={{ height: '500px' }}>
      <LIContainer cfg={config} />
    </div>
  );
}
