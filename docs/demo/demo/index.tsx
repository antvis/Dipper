import React, { useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
  useWidgets,
  IWidgetProps,
  CustomBaseWidgets,
  MapStyle,
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

registerWidget('mapStyle', MapStyle);

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
            options: {
              logo: {
                value:
                  'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*ObVJT4IxmlkAAAAAAAAAAAAAARQnAQ',
                style: {
                  height: '32px',
                  width: '32px',
                },
              },
              title: {
                value: 'XX 管理地图地图',
              },
            },
            subChildren: [
              {
                id: '2',
                position: 'left',
                options: {
                  title: '选择城市',
                },
                type: 'demo',
              },
            ],
          },
          toolbar: {
            subChildren: [
              {
                type: 'controlPosition',
                id: '3',
              },
              {
                type: 'controlPosition',
                id: '4',
              },
              {
                type: 'controlPosition',
                id: '5',
              },
            ],
          },
          controls: [
            {
              position: 'topleft',
              type: 'mapStyle',
              title: '地图样式',
            },
            {
              position: 'topright',
              type: 'controlPosition',
              title: '组件控制',
            },
          ],
          defaultcontrols: [
            {
              type: 'zoom',
              position: 'bottomright',
            },
            {
              type: 'scale',
              position: 'bottomleft',
            },
          ],
        }}
      />
    </div>
  );
}
