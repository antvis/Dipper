import type { IImageLayerGroupOptions } from '@antv/dipper';
import {
  CustomBaseWidgets,
  ImageLayerGroup,
  useConfigService,
  useGlobalModel,
  useLayerService,
  useWidget,
} from '@antv/dipper';
import React, { useEffect, useState } from 'react';

export interface IPOILayerProps {
  id: string;
  type: string;
  options: IImageLayerGroupOptions;
  event: { action: string; actionType: string };
}
const POILayer: React.FC<IPOILayerProps> = ({ id, options }) => {
  const [imageLayerGroup, setImageLayerGroup] = useState<ImageLayerGroup | null>(null);
  const { layerService } = useLayerService();
  const { globalConfig } = useConfigService();
  const [globaldata, setGlobalData] = useGlobalModel<any>();
  const { widgetValue } = useWidget(id);
  const [position, setPositions] = useState(1);

  useEffect(() => {
    const imageLayer = new ImageLayerGroup({
      name: 'poiLayer',
      options: options,
    });

    setImageLayerGroup(imageLayer);

    layerService.addLayer(imageLayer);
    // imageLayer.mainLayer.setIndex(10)
  }, []);

  useEffect(() => {
    if (widgetValue && imageLayerGroup) {
      imageLayerGroup.setData(widgetValue);
      imageLayerGroup?.mainLayer.fitBounds();
      imageLayerGroup?.mainLayer.on('click', () => {
        setPositions(Math.random());
      });
    }
  }, [widgetValue]);

  return <CustomBaseWidgets id="test1" type="test" options={{ position }} />;
};
export default POILayer;
