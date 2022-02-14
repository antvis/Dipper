import React, { useEffect } from 'react';
import { useLayerService, MarkerLayerGroup } from '@antv/dipper';
import { IMarkerItemProps } from '@antv/dipper-widgets/src';

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

const MarkerItem: React.FC<IMarkerItemProps<IDataItem>> = ({
  data,
  index,
  select,
}) => {
  return (
    <img
      src={data.src}
      style={{ width: select ? 50 : 30, height: select ? 55 : 35 }}
      onClick={() => {
        console.log('click');
      }}
    />
  );
};

const MarkerLayer: React.FC = () => {
  const { layerService } = useLayerService();

  useEffect(() => {
    const markerLayerGroup = new MarkerLayerGroup<IDataItem>({
      name: 'gridLayer',
      options: {
        component: MarkerItem,
      },
    });
    layerService.addLayer(markerLayerGroup);
    markerLayerGroup.setData(data);
  }, []);

  return <></>;
};

export default MarkerLayer;
