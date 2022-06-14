import type { IFeature, ILayerService, LayerGroup , ILayerEventTarget} from '@antv/dipper-core';
import { LayerEventEnum, LayerGroupEventEnum, TYPES } from '@antv/dipper-core';
import type { Feature } from '@turf/turf';
import { centerOfMass, coordAll, featureCollection } from '@turf/turf';
import { useInjection } from 'inversify-react';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export const useLayerGroup = (targetLayerName: string) => {
  const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
  const [layerGroup, setLayerGroup] = useState<LayerGroup>();
  const [layerData, setLayerData] = useState(featureCollection([]));
  const [hoverFeature, setHoverFeature] = useState<IFeature | null>(null);
  const [selectFeatures, setSelectFeatures] = useState<IFeature[]>([]);

  useEffect(() => {
    const layerRemove = (e: any) => {
      if (e.type === 'remove' && e.name === targetLayerName) {
        setLayerGroup(undefined);
      }
    };
    const layerAdd = (e: ILayerEventTarget) => {
      if (e.type === 'add' && e.target?.name === targetLayerName) {
        if (!layerGroup) {
          setLayerGroup(e.target as LayerGroup);
        }
      }
    };
    const currentGroup = layerService.getLayer(targetLayerName) as LayerGroup;
    if (currentGroup) {
      setLayerGroup(currentGroup);
    } else {
      layerService.on(LayerEventEnum.LAYERCHANGE, layerAdd);
    }
    return () => {
      layerService.off(LayerEventEnum.LAYERCHANGE, layerAdd);
      layerService.off(LayerEventEnum.LAYERCHANGE, layerRemove);
    };
  }, [targetLayerName]);

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
      if (!features.length) {
        return [] as IFeature[];
      }
      if (layerGroup?.mainLayer) {
        const source = layerGroup.mainLayer.getSource();
        const featureIdList = features.map((feature) => {
          // @ts-ignore
          return source.getFeatureId(uniqueKey, feature.properties[uniqueKey]);
        });

        // @ts-ignore
        return features.map((feature, index) => {
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
      const newFeatures = getIFeatureList(newSelectFeatures, uniqueKey);
      layerGroup?.setSelectFeatures(newFeatures);
    },
    [getIFeatureList],
  );

  const setHoverFeatureCb = useCallback(
    (newHoverFeature: Feature | null, uniqueKey = 'id') => {
      layerGroup?.setHoverFeature(
        newHoverFeature ? getIFeatureList([newHoverFeature], uniqueKey)[0] ?? null : null,
      );
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
  };
};
