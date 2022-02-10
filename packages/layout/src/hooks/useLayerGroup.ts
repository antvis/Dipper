import { useInjection } from 'inversify-react';
import { useEffect, useState, useCallback } from 'react';
import {
  IFeature,
  LayerGroup,
  LayerGroupEventEnum,
  ILayerService,
  LayerEventEnum,
  TYPES,
} from '@antv/dipper-core';
import { featureCollection } from '@turf/turf';
import { isEqual } from 'lodash';

export const useLayerGroup = (targetLayer?: LayerGroup | string | null) => {
  const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
  const [layerGroup, setLayerGroup] = useState<LayerGroup | null>(null);

  const [layerData, setLayerData] = useState(featureCollection([]));
  const [selectFeatures, setSelectFeatures] = useState<IFeature[]>([]);

  const getLayerGroup = useCallback(() => {
    if (typeof targetLayer === 'string') {
      const targetLayerGroup = layerService.getLayer(targetLayer) as LayerGroup;
      if (targetLayerGroup) {
        setLayerGroup(targetLayerGroup);
      }
    } else if (targetLayer instanceof Object) {
      setLayerGroup(targetLayer as LayerGroup);
    } else if (targetLayer) {
      console.warn('未找到指定LayerGroup');
    }
  }, [targetLayer, layerService]);

  useEffect(() => {
    layerService.on(LayerEventEnum.LAYERCHANGE, () => getLayerGroup());
    return () => {
      layerService.off(LayerEventEnum.LAYERCHANGE, () => getLayerGroup());
    };
  }, [getLayerGroup]);

  useEffect(() => {
    if (targetLayer) {
      getLayerGroup();
    }
  }, [targetLayer, getLayerGroup]);

  useEffect(() => {
    if (layerGroup) {
      if (!isEqual(layerGroup.selectFeatures, selectFeatures)) {
        setSelectFeatures(layerGroup.selectFeatures ?? []);
      }
      setLayerData(layerGroup.data);
      layerGroup?.on(LayerGroupEventEnum.DATA_UPDATE, setLayerData);
      layerGroup?.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, setSelectFeatures);
    }
    return () => {
      layerGroup?.off(LayerGroupEventEnum.DATA_UPDATE, setLayerData);
      layerGroup?.off(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, setSelectFeatures);
    };
  }, [layerGroup]);

  return {
    layerGroup,
    layerData,
    setLayerData,
    selectFeatures,
    setSelectFeatures: (selectFeatures: IFeature[]) => {
      layerGroup?.setSelectFeatures(selectFeatures);
    },
    updateProperties: (...args: any[]) => {},
  };
};
