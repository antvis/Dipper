import type { IImageLayerGroupOptions } from '@antv/dipper';
import {
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
    }
  }, [widgetValue]);

  return <></>;
};
export default POILayer;
