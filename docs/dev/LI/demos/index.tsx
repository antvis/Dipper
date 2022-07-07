import { registerWidget } from '@antv/dipper-core';
import { LIContainer } from '@antv/dipper-pc';
import { BubbleLayer, ChoroplethLayer } from '@antv/larkmap';
import React from 'react';
import { config } from './configs/config';
import { BubbleLayerConfig } from './configs/layer-config';

registerWidget('BubbleLayer', BubbleLayer);
registerWidget('ChoroplethLayer', ChoroplethLayer);

export default function AppMap() {
  return (
    <div style={{ height: '500px' }}>
      <LIContainer
        cfg={config}
        onLoad={(dipper) => {
          const layers = dipper.configService?.getConfig('layers');
          layers.push({ ...BubbleLayerConfig, fillColor: 'red' });
          dipper.configService?.setConfig('layers', layers);
        }}
      />
    </div>
  );
}
