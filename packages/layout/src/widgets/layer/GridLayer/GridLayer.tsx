import React, { useState, useEffect } from 'react';
import type { IGridLayerGroupOptions } from './GridLayerGroup';
import { GridLayerGroup } from './GridLayerGroup';
import type { ILayerGroupProps } from '@antv/dipper-core';
import { useLayerService } from '../../../hooks';
import type { FeatureCollection, Polygon } from '@turf/turf';

export interface GridLayerProps extends Omit<ILayerGroupProps<IGridLayerGroupOptions>, 'data'> {
  data: FeatureCollection<Polygon>;
}

const GridLayer: React.FC<GridLayerProps> = ({ data, ...props }) => {
  const { layerService } = useLayerService();
  const [layerGroup, setLayerGroup] = useState<GridLayerGroup | null>(null);

  useEffect(() => {
    const gridLayerGroup = new GridLayerGroup(props);
    layerService.addLayerGroup(gridLayerGroup);
    setLayerGroup(gridLayerGroup);
  }, []);

  useEffect(() => {
    if (layerGroup) {
      layerGroup.setData(data);
    }
  }, [data, layerGroup]);

  return <></>;
};

export default GridLayer;
