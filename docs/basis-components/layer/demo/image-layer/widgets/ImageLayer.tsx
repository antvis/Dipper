import type React from 'react';
import { useEffect, useState } from 'react';
import type { MarkerLayerGroup } from '@antv/dipper';
import { useLayerService, ImageLayerGroup, useLayerGroup } from '@antv/dipper';
interface IDataItem {
  src: string;
  id: string;
  title: string;
  lng: number;
  lat: number;
}
const data = [
  {
    value: 1,
    coordinates: [120.1296615600586, 30.258770655755338],
    w: 19.1,
    t: 24.6,
    s: '海南',
    l: 11,
    m: '东方',
    j: 108.6167,
    h: '59838',
    id: 1,
  },
  {
    value: 2,
    coordinates: [120.1379871368408, 30.26077233371769],
    w: 22.275,
    t: 23.6,
    s: '广东',
    l: 12,
    m: '珠海',
    j: 113.5669,
    h: '59488',
    id: 3,
  },
  {
    value: 3,
    coordinates: [120.1303482055664, 30.241272771047235],
    w: 22.275,
    t: 23.6,
    s: '广东',
    l: 12,
    m: '珠海',
    j: 113.5669,
    h: '59488',
    id: 3,
  },
  {
    value: 4,
    coordinates: [120.13712882995605, 30.253951634073932],
    w: 22.275,
    t: 23.6,
    s: '广东',
    l: 12,
    m: '珠海',
    j: 113.5669,
    h: '59488',
    id: 3,
  }

]

const ImageLayer: React.FC = () => {
  const [layerGroup, setLayerGroup] = useState<MarkerLayerGroup | null>(null);
  const { layerService } = useLayerService();
  const [container, setContainer] = useState<any>(null);
  const { setSelectFeatures } = useLayerGroup('imageLayer');

  useEffect(() => {
    const imageLayerGroup = new ImageLayerGroup({
      name: 'imageLayer',
      options: {
        normal: {
          img: {
            field: 's',
            value: (name: string) => {
              return name;
            },
          },
          imgSize: 10,
        },
        // select: false,
        select: {
          img: {
            field: 's',
            value: (name: string) => {
              return name;
            },
          },
          imgSize: 20,
          text: 'm',
          textSize: 20,
          textStyle: {
            stroke: '#ffffff',
            strokeWidth: 2,
            textOffset: [0, -40],
          },
        },
        image: {
          海南: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg',
          广东: 'https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg',
        },
      },
    });
    layerService.addLayerGroup(imageLayerGroup);
    imageLayerGroup.setData(data, {
      parser: {
        type: 'json',
        coordinates:'coordinates',
      }
    });
  }, []);

  // useInterval(() => {
  //   setSelectFeatures(
  //     [data.features[Math.floor(Math.random() * data.features.length)]],
  //     'm',
  //   );
  // }, 1000);

  return container;
};

export default ImageLayer;
