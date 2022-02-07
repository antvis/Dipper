import React, { useEffect, useState } from 'react';
import { useMount } from 'ahooks';
import {
  useSceneService,
  useLayerService,
  IGridLayerGroupOptions,
  GridLayerGroup,
  BoxSelectLayerGroup,
  useLayerGroup,
  // @ts-ignore
} from '@antv/dipper';
import { FeatureCollection } from '@turf/turf';

export default function GridLayer({
  options,
}: {
  type: 'gridLayer';
  options: IGridLayerGroupOptions;
}) {
  const { layerService } = useLayerService();
  const { sceneService } = useSceneService();
  const [layerGroup, setLayerGroup] = useState<GridLayerGroup | null>(null);

  const { selectFeatures } = useLayerGroup('grid');

  useMount(() => {
    const gridLayerGroup = new GridLayerGroup({
      name: 'grid',
      options: {
        text: {
          field: 'name',
        },
        normal: {
          fillColor: {
            field: 'id',
            value: [
              'rgb(247, 251, 255)',
              'rgb(222, 235, 247)',
              'rgb(198, 219, 239)',
              'rgb(158, 202, 225)',
              'rgb(107, 174, 214)',
              'rgb(66, 146, 198)',
              'rgb(33, 113, 181)',
              'rgb(8, 81, 156)',
              'rgb(8, 48, 107)',
            ],
          },
          borderWidth: 1,
          borderColor: '#ffffff',
        },
      },
    });

    const boxSelectLayerGroup = new BoxSelectLayerGroup({
      name: 'boxSelect',
      options: {
        targets: ['grid'],
      },
    });

    layerService.addLayer(gridLayerGroup);
    layerService.addLayer(boxSelectLayerGroup);
    setLayerGroup(gridLayerGroup);

    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/955b43e4-21ef-42f4-a2b6-c08c843f5d18.json',
    )
      .then((res) => res.json())
      .then((geoJson: FeatureCollection) => {
        gridLayerGroup.setData(geoJson);
      });
  });

  return <></>;
}
