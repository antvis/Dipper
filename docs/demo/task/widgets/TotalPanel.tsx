import React from 'react';
import { useLayerGroup } from '@antv/dipper';
import { StackAreaChart } from '../components/StackArea';
import { LineChart } from '../components/Line';

export function TotalPanel() {
  const { selectFeatures = [] } = useLayerGroup('grid');

  return (
    <>
      <div>
        <h4>堆叠面积图</h4>
        <StackAreaChart data={[]} />
      </div>
      <div>
        <h4>时间进度</h4>
        <LineChart data={[]} />
      </div>
    </>
  );
}
