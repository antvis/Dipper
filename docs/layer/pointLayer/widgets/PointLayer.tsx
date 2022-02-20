import React, { useEffect, useMemo, useState } from 'react';
import { useLayerService, MarkerLayerGroup } from '@antv/dipper';
import { PointLayerGroup } from '@antv/dipper-widgets/src';

interface IDataItem {
  src: string;
  id: string;
  title: string;
  lng: number;
  lat: number;
}

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: '01',
      },
      geometry: {
        type: 'Point',
        coordinates: [120.13785839080809, 30.25532322585323],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: '02',
      },
      geometry: {
        type: 'Point',
        coordinates: [120.13601303100585, 30.252950730688532],
      },
    },
  ],
};

const PointLayer: React.FC = () => {
  const [layerGroup, setLayerGroup] = useState<MarkerLayerGroup | null>(null);
  const { layerService } = useLayerService();
  const [container, setContainer] = useState<any>(null);

  useEffect(() => {
    const pointLayerGroup = new PointLayerGroup({
      name: 'pointLayer',
      options: {
        normal: {
          img: {
            field: 'name',
            value: ['a', 'b'],
          },
          imgSize: 10,
        },
        image: {
          a: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
          b: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg',
        },
      },
    });
    pointLayerGroup.setData(data);
    layerService.addLayer(pointLayerGroup);
  }, []);

  return container;
};

export default PointLayer;
