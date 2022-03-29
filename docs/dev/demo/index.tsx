import React, { useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
  useWidgets,
  IWidgetProps,
  CustomBaseWidgets,
} from '@antv/dipper';
import { Select, Button } from 'antd';
const { Option } = Select;

const demo = (props: IWidgetProps) => {
  const { setGlobalData, globalData } = useConfigService();
  // 状态维护
  return (
    <Button
      value="测试"
      onClick={() => {
        setGlobalData('add', 1);
      }}
    >
      测试
    </Button>
  );
};

const ControlPosition = () => {
  const { globalData, updateControl, configService } = useConfigService();
  console.log('get globalData: ', globalData);

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
registerWidget('demo', demo);

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
                title: '测试1',
                type: 'demo',
                id: '2',
              },
              {
                display: true,
                position: 'left',
                title: '测试2',
                type: 'controlPosition',
                id: '3',
              },
            ],
          },
        }}
      />
    </div>
  );
}
