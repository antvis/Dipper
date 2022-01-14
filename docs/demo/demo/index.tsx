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
import {
  PieChart,
  AreaChart,
  LinesChart,
  ColumnsChart,
} from '@alipay/dipper-dubhe';
import {
  multidimensionalChart,
  singleLineChart,
} from '../analysis/configs/mock';
const { Option } = Select;

const demo = (props: IWidgetProps) => {
  // 状态维护
  return <Button value="测试">测试</Button>;
};

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
            subChildren: [
              {
                display: true,
                position: 'left',
                title: '选择城市',
                type: 'demo',
                id: '2',
              },
            ],
          },
        }}
      />
    </div>
  );
}
