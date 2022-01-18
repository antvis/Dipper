import React, { useEffect, useState } from 'react';
import { registerWidget, getAllWidgets } from '@antv/dipper-core';
import { CitySelect } from '@antv/dipper-widgets';
import { DipperContainer } from '@antv/dipper-widgets';
import { config } from './configs/config';
import { Select, Button } from 'antd';
const { Option } = Select;
registerWidget('citySelect', CitySelect);

export default function RumbMap() {
  console.log(getAllWidgets());
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer cfg={config} />
    </div>
  );
}
