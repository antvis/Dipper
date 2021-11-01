import {
  useConfigService,
  LayerGroupEventEnum,
  useLayerService,
} from '@antv/dipper';
import React, { useEffect, useMemo, useState } from 'react';
import { geojson } from '../configs/mock';
import { GridLayerGroup } from '@antv/dipper';

export function GridLayer() {
  const { layerService } = useLayerService();
  const { globalConfig, updateLegend } = useConfigService();
  const { layers } = globalConfig;
  const [gridLayer, setGridLayer] = useState<GridLayerGroup>();

  const layerProps = useMemo(() => {
    return layers.find((item: any) => item.type === 'gridLayer');
  }, [layers]);

  const updateLayerLegend = (items: any[]) => {
    updateLegend('gridLayerLegend', {
      type: 'classifycolor',
      display: true,
      position: 'bottomleft',
      options: {
        targetName: '区域类型',
        unkownName: layerProps.options.unkownName,
        items,
      },
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const layer = new GridLayerGroup({
      name: 'grid',
      geodata: {
        type: 'FeatureCollection',
        features: geojson,
      },
      options: layerProps.options,
    });

    layerService.addLayer(layer);
    layer.on(LayerGroupEventEnum.DATAUPDATE, () => {
      updateLayerLegend(layer.getLegendItem());
    });

    // 更新图例
    updateLayerLegend(layer.getLegendItem());

    setGridLayer(layers);
  }, [geojson]);

  return <></>;
}
