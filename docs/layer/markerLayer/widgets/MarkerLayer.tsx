import React, { useEffect } from 'react';
import { useLayerService, MarkerLayerGroup } from '@antv/dipper';

interface IDataItem {
  src: string;
  id: string;
  title: string;
  lng: number;
  lat: number;
}

const data: IDataItem[] = [
  {
    src: 'https://gw.alipayobjects.com/mdn/rms_5e897d/afts/img/A*N4QDTr9Et0YAAAAAAAAAAAAAARQnAQ',
    id: '1',
    title: '西湖',
    lng: 120.13781547546387,
    lat: 30.253729211980726,
  },
  {
    src: 'https://gw.alipayobjects.com/mdn/rms_5e897d/afts/img/A*ecagRq-0kFkAAAAAAAAAAAAAARQnAQ',
    id: '2',
    title: '蚂蚁A空间',
    lng: 120.09940087795259,
    lat: 30.2639184071299,
  },
];

const MarkerItem: React.FC<IDataItem> = (props) => {
  console.log(props);
  return <></>;
};

const MarkerLayer: React.FC = () => {
  const { layerService } = useLayerService();

  useEffect(() => {
    const markerLayerGroup = new MarkerLayerGroup<IDataItem>({
      item: (data) => MarkerItem,
    });
    layerService.addLayer(markerLayerGroup);
    markerLayerGroup.setData(data);
  }, []);

  return <div></div>;
};

export default MarkerLayer;
