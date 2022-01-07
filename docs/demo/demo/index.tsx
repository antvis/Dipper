import React, { useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
} from '@antv/dipper';
import { Select, Button } from 'antd';
import { CustomBaseWidgets } from '@antv/dipper-widgets';
const { Option } = Select;

const demo = (props: any) => {
  return <Button value="测试">{props.options.title}</Button>;
};

const layout = (props: any) => {
  return <CustomBaseWidgets>{demo(props)}</CustomBaseWidgets>;
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
registerWidget('demo', layout);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer
        cfg={{
          controls: [
            {
              display: true,
              position: 'topleft',
              type: 'demo',
              options: {
                title: '这个是测试',
              },
            },
            {
              display: true,
              position: 'topright',
              type: 'controlPosition',
            },
          ],
        }}
      />
    </div>
  );
}
