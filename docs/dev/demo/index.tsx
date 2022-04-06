import React, { useEffect, useState } from 'react';
import type {
  IWidgetProps} from '@antv/dipper';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
  useWidgets,
  CustomBaseWidgets,
  useGlobalModel,
} from '@antv/dipper';
import { Select, Button } from 'antd';
const { Option } = Select;

const Demo = (props: IWidgetProps) => {
  const [, setGlobalData] = useGlobalModel();

  return (
    <Button value="测试" onClick={() => setGlobalData({ a: 1 })}>
      测试
    </Button>
  );
};

const ControlPosition = () => {
  const { updateControl } = useConfigService();
  const [globalData] = useGlobalModel();

  console.log('globalData: ', globalData);

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
registerWidget('demo', Demo);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer
        cfg={{
          headerbar: {
            display: true,
            options: {
              title: {
                value: 'XX 管理地图地图',
                display: true,
              },
            },
            components: [
              {
                display: true,
                position: 'left',
                title: '1',
                type: 'demo',
                id: '1',
              },
              {
                display: true,
                position: 'left',
                title: '2',
                type: 'controlPosition',
                id: '2',
              },
            ],
          },
        }}
      />
    </div>
  );
}
