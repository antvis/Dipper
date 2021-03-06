import React, { useEffect } from 'react';
import { PointLayerGroup } from '@antv/dipper';
import { useLayerService } from '@antv/dipper-layout';

interface IProps {}
const data =[
  {
    value: 1,
    coordinates: [120.1296615600586, 30.258770655755338],
  },
  {
    value: 2,
    coordinates: [120.1379871368408, 30.26077233371769]
  },
  {
    value: 3,
    coordinates: [120.1303482055664, 30.241272771047235],
  },
  {
    value: 4,
    coordinates: [120.13712882995605, 30.253951634073932],
  }

]

const PointLayer: React.FC<IProps> = () => {
  const { layerService } = useLayerService();

  useEffect(() => {
    const pointLayerGroup = new PointLayerGroup({
      name: 'point',
      data,
      options: {
        sourceOption:{parser:{
          type:'json',
          coordinates:'coordinates'
        }},
        normal: {
          color: {
            field: 'value',
            value: ['#BAE7FF', '#69C0FF', '#0A6DD9', '#003A8C'],
          },
          size: {
            field: 'value',
            value: [1, 50],
          },
        },
        autoFit: true,
        multipleSelect: true,
      },
    });
    // pointLayerGroup.setData(data,{parser:{
    //   type:'json',
    //   coordinates:'coordinates'
    // }});
    layerService.addLayerGroup(pointLayerGroup);


  }, []);

  return <div>123456</div>;
};

export default PointLayer;
