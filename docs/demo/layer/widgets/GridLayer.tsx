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

  useEffect(() => {
    console.log(selectFeatures);
  }, [selectFeatures]);

  useMount(() => {
    const gridLayerGroup = new GridLayerGroup({
      name: 'grid',
      options: {
        text: {
          field: 'name',
        },
        normal: {
          fillColor: {
            field: 'centerLng',
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
          scale: {
            centerLng: {
              type: 'quantile',
            },
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
      'https://gw.alipayobjects.com/os/bmw-prod/f270ef08-b2ac-49e5-8811-6837723cd4c3.json',
    )
      .then((res) => res.json())
      .then((geoJson: FeatureCollection) => {
        gridLayerGroup.setData(geoJson);
      });
  });

  return <></>;
}
