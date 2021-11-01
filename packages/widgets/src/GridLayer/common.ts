export interface ILayerGroupOption {
  label: {
    field: string;
    size: number;
    color: string;
  };
  fill: {
    field: string;
    color: string | string[];
    opacity: number;
    unkownName: string;
  };
}

export interface IGridLayerProps {
  geodata: any;
  name: string;
  options: ILayerGroupOption;
}

export interface IFeature {
  x: number;
  y: number;
  type: string;
  lngLat: {
    lng: number;
    lat: number;
  };
  feature: unknown;
  featureId: number | null;
}

export const uniqFeatures = (features: IFeature[], newFeature: IFeature) => {
  const item = features.some((fe) => {
    return fe.featureId === newFeature.featureId;
  });
  if (item) {
    return features.filter((feature: any) => {
      return feature.featureId !== newFeature.featureId;
    });
  }
  return [...features, newFeature];
};

export const blankData = {
  type: 'FeatureCollection',
  features: [],
};

export function formatGeoData(group: any) {
  const features = group.featureList?.map((feature: any) => {
    const { coordinateList, type, ...info } = feature;
    return {
      type: 'Feature',
      properties: info,
      geometry: {
        type,
        coordinates: JSON.parse(coordinateList as string),
      },
    };
  });
  return features;
}

export function joinData(
  geoData: any[],
  propertiesData: any[],
  joinBy: [string, string],
) {
  const joinObj = {};
  propertiesData.forEach((item: any) => {
    joinObj[item[joinBy[1]]] = item;
  });
  return geoData.map((feature) => {
    return {
      ...feature,
      properties: {
        ...joinObj[feature.properties[joinBy[0]]],
        ...feature.properties,
        label:
          joinObj[feature.properties[joinBy[0]]]?.label ||
          feature.properties.label ||
          '',
      },
    };
  });
}

export function fromPairs(pairs: any[]) {
  const result = {};
  if (pairs == null) {
    return result;
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1];
  }
  return result;
}
