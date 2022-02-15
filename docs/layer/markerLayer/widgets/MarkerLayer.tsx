import React, { useEffect, useMemo, useState } from 'react';
import { useLayerService, MarkerLayerGroup } from '@antv/dipper';
import { IMarkerItemProps } from '@antv/dipper-widgets/src';
import { useLayerGroup } from '@antv/dipper-layout';

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
  // select,
}) => {
  const { selectFeatures } = useLayerGroup('markerLayer');
  const isSelect = useMemo(
    () => selectFeatures[0]?.featureId === index,
    [selectFeatures, index],
  );
  console.log(isSelect);
  return (
    <img
      src={data.src}
      style={{ width: 30, height: 35 }}
      onClick={() => {
        console.log('click');
      }}
    />
  );
};

const MarkerLayer: React.FC = () => {
  const [layerGroup, setLayerGroup] = useState<MarkerLayerGroup | null>(null);
  const { layerService } = useLayerService();
  const [container, setContainer] = useState<any>(null);

  useEffect(() => {
    const markerLayerGroup = new MarkerLayerGroup<IDataItem>({
      name: 'markerLayer',
      options: {
        component: MarkerItem,
      },
    });
    layerService.addLayer(markerLayerGroup);
    const markerContainer = markerLayerGroup.setData(data);
    setLayerGroup(markerLayerGroup);
    setContainer(markerContainer);
  }, []);

  return container;
};

export default MarkerLayer;
