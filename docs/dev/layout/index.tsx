import { registerWidget } from '@antv/dipper-core';
import { DipperContainer } from '@antv/dipper-pc';
import { CitySelect } from '@antv/dipper-widgets';
import { Select } from 'antd';
import React from 'react';
import AppMap from './app';
import { config } from './configs/config';
import AOILayer from './widgets/AOILayer';
import POILayer from './widgets/POILayer';
import TestComponent from './widgets/test';
const { Option } = Select;
registerWidget('citySelect', CitySelect);
registerWidget('poi', POILayer);
registerWidget('aoi', AOILayer);
registerWidget('test', TestComponent);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer cfg={config}>
        <AppMap />
      </DipperContainer>
    </div>
  );
}
