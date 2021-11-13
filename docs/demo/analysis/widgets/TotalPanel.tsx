import React from 'react';
import { useLayerGroup } from '@antv/dipper'
import { StackAreaCahrt } from '../components/StackArea';
import { LineCahrt } from '../components/Line';


export function TotalPanel() {

  const { selectFeatures = [] } = useLayerGroup('grid')


  return (
    <>
      <div>
        <h4>堆叠面积图</h4>
        <StackAreaCahrt data={[]} />
      </div>
      <div>
        <h4>时间进度</h4>
        <LineCahrt data={[]} />
      </div>
    </>
  );
}
