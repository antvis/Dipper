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

const PointLayer: React.FC = () => {
  const [layerGroup, setLayerGroup] = useState<MarkerLayerGroup | null>(null);
  const { layerService } = useLayerService();
  const [container, setContainer] = useState<any>(null);

  useEffect(() => {
    // const markerLayerGroup = new MarkerLayerGroup<IDataItem>({
    //   name: 'markerLayer',
    //   options: {
    //     component: MarkerItem,
    //   },
    // });
    // layerService.addLayer(markerLayerGroup);
    // const markerContainer = markerLayerGroup.setData(data);
    // setLayerGroup(markerLayerGroup);
    // setContainer(markerContainer);
    const pointLayerGroup = new PointLayerGroup({
      name: 'pointLayer',
      options: {},
    });
    layerService.addLayer(pointLayerGroup);
  }, []);

  return container;
};

export default PointLayer;
