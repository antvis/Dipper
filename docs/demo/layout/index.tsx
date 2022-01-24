import React, { useEffect, useState } from 'react';
import { registerWidget } from '@antv/dipper-core';
import { CitySelect } from '@antv/dipper-widgets';
import { DipperContainer } from '@antv/dipper-layout';
import { config } from './configs/config';
import { Select, Button } from 'antd';
const { Option } = Select;
registerWidget('citySelect', CitySelect);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer cfg={config} />
    </div>
  );
}
