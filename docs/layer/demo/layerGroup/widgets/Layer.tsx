import React, { useEffect } from 'react';
import { useLayerService } from '@antv/dipper-layout';
import CustomLayerGroup from './CustomLayerGroup';

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

const Layer: React.FC<IProps> = () => {
  const { layerService } = useLayerService();

  useEffect(() => {
    const customLayerGroup = new CustomLayerGroup({
      name: 'custom',
      options: {},
    });

    layerService.addLayer(customLayerGroup);

    setTimeout(() => {
      customLayerGroup.setData(data);
    }, 1000);
  }, []);

  return <div>123456</div>;
};

export default Layer;
