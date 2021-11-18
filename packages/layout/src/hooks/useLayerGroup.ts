import { useInjection } from 'inversify-react';

import type {
  ILayerGroup,
  ILayerService,
  ILayerEventTarget,
} from '@antv/dipper-core';

import { LayerGroupEventEnum, LayerEventEnum, TYPES } from '@antv/dipper-core';
import { useCallback, useEffect, useState } from 'react';
import type { Feature, FeatureCollection } from '@turf/turf';

export function useLayerGroup(name: string) {
  const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
  const [currentGroup, setLayerGroup] = useState<ILayerGroup>();
  const [currentSelectFeatures, setSelectFeatures] = useState<Feature[]>([]);
  const [currentHoverFeature, setHoverFeature] = useState<Feature | null>(null);
  useEffect(() => {
    const layerAdd = (e: ILayerEventTarget) => {
      if (e.type === 'add' && e.target?.name === name) {
        if (!currentGroup) {
          setLayerGroup(e.target);
        }
      }
    };
    if (layerService.getLayer(name)) {
      setLayerGroup(layerService.getLayer(name));
    } else {
      layerService.on(LayerEventEnum.LAYERCHANGE, layerAdd);
    }
    return () => {
      layerService.off(LayerEventEnum.LAYERCHANGE, layerAdd);
    };
  }, []);

  useEffect(() => {
    const onSelectFeature = (features: any[]) => {
      setSelectFeatures(features);
    };
    const onHoverFeature = (feature: any) => {
      setHoverFeature(feature);
    };
    if (currentGroup) {
      currentGroup.on(LayerGroupEventEnum.SELECTFEATURECHANGE, onSelectFeature);
      currentGroup.on(LayerGroupEventEnum.HOVERFEATURECHANGE, onHoverFeature);
    }
    return () => {
      if (currentGroup) {
        currentGroup.off(
          LayerGroupEventEnum.SELECTFEATURECHANGE,
          onSelectFeature,
        );
        currentGroup.off(
          LayerGroupEventEnum.HOVERFEATURECHANGE,
          onHoverFeature,
        );
      }
    };
  }, [currentGroup]);

  const updateProperties = useCallback(
    (feature: Feature, properties: Record<string, any>) => {
      // 检索选中网格信息
      setSelectFeatures((list: any[] = []) => {
        const newList = [...list];
        const targetIndex = newList?.findIndex(
          (item) => feature.properties?.id === item.feature.properties.id,
        );
        if (Array.isArray(newList) && targetIndex > -1) {
          newList[targetIndex].feature.properties = Object.assign(
            newList[targetIndex].feature.properties,
            properties,
          );
        }
        return newList;
      });

      // 检索hover网格信息
      setHoverFeature((item: any) => {
        if (item) {
          const newItem = { ...item };
          newItem.feature.properties = Object.assign(
            newItem.feature.properties,
            properties,
          );
          return newItem;
        }
        return item;
      });

      // 修改source网格信息
      // @ts-ignore TODO  数据更新方式修改
      const geoJson = currentGroup?.source?.originData as FeatureCollection;
      const targetIndex = geoJson.features.findIndex(
        (item: Feature) => feature.properties?.id === item.properties?.id,
      );
      if (targetIndex > -1) {
        geoJson.features[targetIndex].properties = Object.assign(
          geoJson.features[targetIndex].properties,
          properties,
        );
        currentGroup?.updateSource(geoJson);
      }
    },
    [currentGroup],
  );

  return {
    currentGroup,
    updateProperties,
    selectFeatures: currentSelectFeatures,
    hoverFeature: currentHoverFeature,
  };
}
