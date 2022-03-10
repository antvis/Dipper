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
import { centerOfMass, coordAll, Feature, featureCollection } from '@turf/turf';
import { isEqual } from 'lodash';

export const useLayerGroup = (targetLayer?: LayerGroup | string | null) => {
  const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
  const [layerGroup, setLayerGroup] = useState<LayerGroup | null>(null);

  const [layerData, setLayerData] = useState(featureCollection([]));
  const [hoverFeature, setHoverFeature] = useState<IFeature | null>(null);
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
      if (hoverFeature?.featureId !== layerGroup.hoverFeature?.featureId) {
        setHoverFeature(layerGroup.hoverFeature ?? null);
      }
      setLayerData(layerGroup.data);
      layerGroup?.on(LayerGroupEventEnum.DATA_UPDATE, setLayerData);
      layerGroup?.on(LayerGroupEventEnum.HOVER_FEATURE_CHANGE, setHoverFeature);
      layerGroup?.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, setSelectFeatures);
    }
    return () => {
      layerGroup?.off(LayerGroupEventEnum.DATA_UPDATE, setLayerData);
      layerGroup?.off(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, setSelectFeatures);
      layerGroup?.off(LayerGroupEventEnum.HOVER_FEATURE_CHANGE, setHoverFeature);
    };
  }, [layerGroup]);

  const getIFeatureList = useCallback(
    (features: Feature[], uniqueKey = 'id') => {
      if (features.length) {
        return [] as IFeature[];
      }
      if (layerGroup?.mainLayer) {
        const source = layerGroup.mainLayer.getSource();
        const featureIdList = selectFeatures.map((feature) => {
          // @ts-ignore
          return source.getFeatureId(uniqueKey, feature.properties[uniqueKey]);
        });

        // @ts-ignore
        return selectFeatures.map((feature, index) => {
          const [lng, lat] = coordAll(centerOfMass(feature))[0];
          const iFeature: IFeature = {
            // @ts-ignore
            feature,
            featureId: featureIdList[index] ?? 0,
            lngLat: {
              lng,
              lat,
            },
          };
          return iFeature;
        });
      } else {
        throw new Error('当期LayerGroup内实现的mainLayer有误');
      }
    },
    [layerGroup],
  );

  const setSelectFeaturesCb = useCallback(
    (newSelectFeatures: Feature[], uniqueKey = 'id') => {
      layerGroup?.setSelectFeatures(getIFeatureList(newSelectFeatures, uniqueKey));
    },
    [getIFeatureList],
  );

  const setHoverFeatureCb = useCallback(
    (newHoverFeature: Feature | null, uniqueKey = 'id') => {
      layerGroup?.setHoverFeature(newHoverFeature ? getIFeatureList([newHoverFeature], uniqueKey)[0] ?? null : null);
    },
    [getIFeatureList],
  );

  return {
    layerGroup,
    layerData,
    setLayerData,
    selectFeatures,
    setSelectFeatures: setSelectFeaturesCb,
    hoverFeature,
    setHoverFeature: setHoverFeatureCb,
    updateProperties: (...args: any[]) => {},
  };
};
