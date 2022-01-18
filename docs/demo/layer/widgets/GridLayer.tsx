import React, { useState } from 'react';
import { useMount } from 'ahooks';
import {
  useSceneService,
  useLayerService,
  IGridLayerGroupOptions,
  GridLayerGroup1,
  // @ts-ignore
} from '@antv/dipper';
import { Scene } from '@antv/l7';
import { FeatureCollection } from '@turf/turf';

export default function GridLayer({
  options,
}: {
  type: 'gridLayer';
  options: IGridLayerGroupOptions;
}) {
  const { layerService } = useLayerService();
  const { sceneService } = useSceneService();
  const [layerGroup, setLayerGroup] = useState<GridLayerGroup1 | null>(null);

  useMount(() => {
    const gridLayerGroup = new GridLayerGroup1({
      name: 'grid',
      options: {
        text: {
          field: 'source',
        },
      },
      container: sceneService.container,
    });

    layerService.addLayer(gridLayerGroup);
    setLayerGroup(gridLayerGroup);

    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/e868565b-d3f7-4057-bd60-4df5d869970f.json',
    )
      .then((res) => res.json())
      .then((geoJson: FeatureCollection) => {
        gridLayerGroup.setData(geoJson);
      });
  });

  return <></>;
}