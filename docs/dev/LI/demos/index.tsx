import { registerWidget } from '@antv/dipper-core';
import { LIContainer } from '@antv/dipper-pc';
import { CitySelect } from '@antv/dipper-widgets';
import React from 'react';
import { config } from './configs/config';

registerWidget('citySelect', CitySelect);

export default function AppMap() {
  return (
    <div style={{ height: '500px' }}>
      <LIContainer cfg={config} />
    </div>
  );
}
