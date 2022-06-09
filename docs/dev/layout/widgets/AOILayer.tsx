import React, { useEffect, useState } from 'react';
import type { IGridLayerGroupOptions } from '@antv/dipper';
import { GridLayerGroup, useWidget, useLayerService } from '@antv/dipper';

export interface IAOILayerProps {
  type: 'gridLayer';
  id: string;
  options: IGridLayerGroupOptions;
  event: { action: string; actionType: string };
}

const AOILayer: React.FC<IAOILayerProps> = ({ id, options }) => {
  const [layerGroup, setLayerGroup] = useState<GridLayerGroup | null>(null);
  const { layerService } = useLayerService();
  const { widgetValue } = useWidget(id);
  useEffect(() => {
    const gridLayerGroup = new GridLayerGroup({
      name: 'aoilayer',
      options,
    });

    setLayerGroup(gridLayerGroup);
    layerService.addLayer(gridLayerGroup);
  }, []);

  useEffect(() => {
    if (widgetValue && layerGroup) {
      layerGroup.setData(widgetValue);
      layerGroup?.mainLayer.fitBounds();
    }
  }, [widgetValue]);

  return <></>;
};
export default AOILayer;
