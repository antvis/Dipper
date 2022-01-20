import { useInjection } from 'inversify-react';
import { useEffect, useState } from 'react';
import {
  IFeature,
  LayerGroup,
  LayerGroupEventEnum,
  ILayerService,
  LayerEventEnum,
  TYPES,
} from '@antv/dipper-core';
import { featureCollection } from '@turf/turf';

export const useLayerGroup = (targetLayer?: LayerGroup | string | null) => {
  const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
  const [layerGroup, setLayerGroup] = useState<LayerGroup | null>(null);

  const [layerData, setLayerData] = useState(featureCollection([]));
  const [selectFeatures, setSelectFeatures] = useState<IFeature[]>([]);

  const getLayerGroup = () => {
    if (typeof targetLayer === 'string') {
      setLayerGroup((layerService.getLayer(targetLayer) as LayerGroup) ?? null);
    } else if (targetLayer instanceof Object) {
      setLayerGroup(targetLayer as LayerGroup);
    } else if (targetLayer) {
      console.warn('未找到指定LayerGroup');
    }
  };

  useEffect(() => {
    if (targetLayer) {
      getLayerGroup();
    }
  }, [
    targetLayer,
    layerService
      .getLayers()
      .map((layer) => layer.name)
      .join(','),
  ]);

  useEffect(() => {
    if (layerGroup) {
      setSelectFeatures(layerGroup.selectFeatures ?? []);
      setLayerData(layerGroup.data);

      layerGroup?.on(LayerGroupEventEnum.DATA_UPDATE, setLayerData);
      layerGroup?.on(
        LayerGroupEventEnum.SELECT_FEATURE_CHANGE,
        setSelectFeatures,
      );
    }
    return () => {
      layerGroup?.off(LayerGroupEventEnum.DATA_UPDATE, setLayerData);
      layerGroup?.off(
        LayerGroupEventEnum.SELECT_FEATURE_CHANGE,
        setSelectFeatures,
      );
    };
  }, [layerGroup]);

  return {
    layerData,
    setLayerData,
    setHoverFeature: (hoverFeature: IFeature | null) => {
      layerGroup?.setHoverFeature(hoverFeature);
    },
    selectFeatures,
    setSelectFeatures: (selectFeatures: IFeature[]) => {
      layerGroup?.setSelectFeatures(selectFeatures);
    },
    updateProperties: (...args: any[]) => {},
  };
};

// export function useLayerGroup(name: string) {
//   const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
//   const [currentGroup, setLayerGroup] = useState<ILayerGroup>();
//   const [currentSelectFeatures, setSelectFeatures] = useState<Feature[]>([]);
//   const [currentHoverFeature, setHoverFeature] = useState<Feature | null>(null);
//   useEffect(() => {
//     const layerAdd = (e: ILayerEventTarget) => {
//       if (e.type === 'add' && e.target?.name === name) {
//         if (!currentGroup) {
//           setLayerGroup(e.target);
//         }
//       }
//     };
//     if (layerService.getLayer(name)) {
//       setLayerGroup(layerService.getLayer(name));
//     } else {
//       layerService.on(LayerEventEnum.LAYERCHANGE, layerAdd);
//     }
//     return () => {
//       layerService.off(LayerEventEnum.LAYERCHANGE, layerAdd);
//     };
//   }, []);
//
//   useEffect(() => {
//     if (currentGroup) {
//       setSelectFeatures(currentGroup.getSelectFeatures?.() || []);
//     }
//   }, [currentGroup]);
//
//   useEffect(() => {
//     const onSelectFeature = (features: any[]) => {
//       setSelectFeatures(features);
//     };
//     const onHoverFeature = (feature: any) => {
//       setHoverFeature(feature);
//     };
//     if (currentGroup) {
//       currentGroup.on(
//         LayerGroupEventEnum.SELECT_FEATURE_CHANGE,
//         onSelectFeature,
//       );
//       currentGroup.on(LayerGroupEventEnum.HOVER_FEATURE_CHANGE, onHoverFeature);
//     }
//     return () => {
//       if (currentGroup) {
//         currentGroup.off(
//           LayerGroupEventEnum.SELECT_FEATURE_CHANGE,
//           onSelectFeature,
//         );
//         currentGroup.off(
//           LayerGroupEventEnum.HOVER_FEATURE_CHANGE,
//           onHoverFeature,
//         );
//       }
//     };
//   }, [currentGroup]);
//
//   const updateProperties = useCallback(
//     (feature: Feature, properties: Record<string, any>) => {
//       // 检索选中网格信息
//       setSelectFeatures((list: any[] = []) => {
//         const newList = [...list];
//         const targetIndex = newList?.findIndex(
//           (item) => feature.properties?.id === item.feature.properties.id,
//         );
//         if (Array.isArray(newList) && targetIndex > -1) {
//           newList[targetIndex].feature.properties = Object.assign(
//             newList[targetIndex].feature.properties,
//             properties,
//           );
//         }
//         return newList;
//       });
//
//       // 检索hover网格信息
//       setHoverFeature((item: any) => {
//         if (item) {
//           const newItem = { ...item };
//           newItem.feature.properties = Object.assign(
//             newItem.feature.properties,
//             properties,
//           );
//           return newItem;
//         }
//         return item;
//       });
//
//       // 修改source网格信息
//       // @ts-ignore TODO  数据更新方式修改
//       const geoJson = currentGroup?.source?.originData as FeatureCollection;
//       const targetIndex = geoJson.features.findIndex(
//         (item: Feature) => feature.properties?.id === item.properties?.id,
//       );
//       if (targetIndex > -1) {
//         geoJson.features[targetIndex].properties = Object.assign(
//           geoJson.features[targetIndex].properties,
//           properties,
//         );
//         currentGroup?.updateSource(geoJson);
//       }
//     },
//     [currentGroup],
//   );
//
//   return {
//     currentGroup,
//     updateProperties,
//     selectFeatures: currentSelectFeatures,
//     hoverFeature: currentHoverFeature,
//   };
// }
