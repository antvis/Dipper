import React, { useEffect } from 'react';
import { PointLayerGroup } from '@antv/dipper';
import { useLayerService } from '@antv/dipper-layout';

interface IProps {}

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [120.1296615600586, 30.258770655755338],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [120.1379871368408, 30.26077233371769],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [120.13712882995605, 30.253951634073932],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [120.1303482055664, 30.241272771047235],
      },
    },
  ],
};

const PointLayer: React.FC<IProps> = () => {
  const { layerService } = useLayerService();

  useEffect(() => {
    const pointLayerGroup = new PointLayerGroup({
      name: 'point',
      options: {
        normal: {},
        select: {},
        autoFit: true,
        multipleSelect: true,
      },
    });
    pointLayerGroup.setData(data);

    layerService.addLayer(pointLayerGroup);
  }, []);

  return <div>123456</div>;
};

export default PointLayer;
