import React, { useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
} from '@antv/dipper';
import { Select } from 'antd';
const { Option } = Select;

const ControlPosition = () => {
  const { updateControl } = useConfigService();
  return (
    <Select
      defaultValue="topleft"
      style={{ width: 120 }}
      onChange={(e) => {
        updateControl('mapStyle', {
          position: e,
        });
      }}
    >
      {[
        'bottomleft',
        'bottomright',
        'topleft',
        'topright',
        'topcenter',
        'bottomcenter',
        'leftcenter',
        'rightcenter',
      ].map((value: string) => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};

registerWidget('controlPosition', ControlPosition);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer
        cfg={{
          controls: [
            {
              display: true,
              position: 'topleft',
              type: 'mapStyle',
              title: '地图样式',
            },
            {
              display: true,
              position: 'topright',
              type: 'controlPosition',
              title: '组件控制',
            },
          ],
        }}
      />
    </div>
  );
}
