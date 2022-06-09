import React, { useEffect, useState } from 'react';
import { registerWidget } from '@antv/dipper-core';
import { CitySelect } from '@antv/dipper-widgets';
import { DipperContainer } from '@antv/dipper-pc';
import { config } from './configs/config';
import { Select, Button } from 'antd';
import POILayer from './widgets/POILayer';
import AOILayer from './widgets/AOILayer';
import AppMap from './app';
const { Option } = Select;
registerWidget('citySelect', CitySelect);
registerWidget('poi', POILayer);
registerWidget('aoi', AOILayer);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer cfg={config}>
        <AppMap />
      </DipperContainer>
    </div>
  );
}
