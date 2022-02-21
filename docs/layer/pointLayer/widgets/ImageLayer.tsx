import React, { useEffect, useState } from 'react';
import { useLayerService, MarkerLayerGroup } from '@antv/dipper';
import { ImageLayerGroup } from '@antv/dipper-widgets/src';

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
        w: 19.1,
        t: 24.6,
        s: '海南',
        l: 11,
        m: '东方',
        j: 108.6167,
        h: '59838',
      },
      geometry: {
        type: 'Point',
        coordinates: [108.6167, 19.1],
      },
    },
    {
      type: 'Feature',
      properties: {
        w: 20,
        t: 23.8,
        s: '海南',
        l: 11,
        m: '海口',
        j: 110.25,
        h: '59758',
      },
      geometry: {
        type: 'Point',
        coordinates: [110.25, 20],
      },
    },
    {
      type: 'Feature',
      properties: {
        w: 22.275,
        t: 23.6,
        s: '广东',
        l: 12,
        m: '珠海',
        j: 113.5669,
        h: '59488',
      },
      geometry: {
        type: 'Point',
        coordinates: [113.5669, 22.275],
      },
    },
    {
      type: 'Feature',
      properties: {
        w: 20.3372,
        t: 23.4,
        s: '广东',
        l: 12,
        m: '徐闻',
        j: 110.1794,
        h: '59754',
      },
      geometry: {
        type: 'Point',
        coordinates: [110.1794, 20.3372],
      },
    },
    {
      type: 'Feature',
      properties: {
        w: 19.2089,
        t: 23.2,
        s: '海南',
        l: 12,
        m: '琼海',
        j: 110.4819,
        h: '59855',
      },
      geometry: {
        type: 'Point',
        coordinates: [110.4819, 19.2089],
      },
    },
  ],
};

const ImageLayer: React.FC = () => {
  const [layerGroup, setLayerGroup] = useState<MarkerLayerGroup | null>(null);
  const { layerService } = useLayerService();
  const [container, setContainer] = useState<any>(null);

  useEffect(() => {
    const imageLayerGroup = new ImageLayerGroup({
      name: 'pointLayer',
      options: {
        normal: {
          img: {
            field: 's',
            value: (name: string) => {
              return name;
            },
          },
          imgSize: 20,
          text: 'm',
          textSize: 14,
          textStyle: {
            stroke: '#ffffff',
            strokeWidth: 2,
            textOffset: [0, -50],
          },
        },
        select: {
          imgSize: 30,
          textStyle: [0, -60],
        },
        image: {
          海南: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
          广东: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg',
        },
      },
    });
    layerService.addLayer(imageLayerGroup);
    imageLayerGroup.setData(data);
  }, []);

  return container;
};

export default ImageLayer;
