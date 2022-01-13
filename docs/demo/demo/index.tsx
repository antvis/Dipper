import React, { useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
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

const styles = {
  width: '100%',
  height: 150,
  padding: '0 24px',
  margin: '10px 0',
};

function Charts() {
  return (
    <>
      <PieChart data={singleLineChart()} />
      <div style={styles}>
        <AreaChart data={singleLineChart()} />
      </div>
      <div style={styles}>
        <LinesChart data={multidimensionalChart()} />
      </div>
      <div style={styles}>
        <ColumnsChart data={multidimensionalChart()} />
      </div>
    </>
  );
}

const demo = () => {
  return (
    <Button value="测试">测试</Button>
    // <CustomBaseWidgets>
    // </CustomBaseWidgets>
  );
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
registerWidget('charts', Charts);

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer
        cfg={{
          headerbar: {
            display: true,
            title: {
              value: 'XX 管理地图地图',
              display: true,
            },
            children: [
              {
                display: true,
                position: 'left',
                title: '选择城市',
                type: 'demo',
                // event: {
                //   actionType: 'map',
                //   action: 'queryArea',
                // },
              },
            ],
          },
        }}
      />
    </div>
  );
}
