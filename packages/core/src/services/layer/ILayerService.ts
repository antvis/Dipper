import type { ILayer, ISource, ISourceCFG } from '@antv/l7';
import type { BBox, Feature } from '@turf/turf';
import type EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';

export interface IFeature {
  featureId: number;
  feature: Feature;
  lngLat: {
    lng: number;
    lat: number;
  };
  target?: MouseEvent;
}

export interface ILayerEventTarget {
  type: 'add' | 'remove';
  target?: ILayerGroup;
}

export interface ILayerGroup extends EventEmitter {
  data: any;
  name: string;
  source?: ISource;
  show: () => void;
  hide: () => void;
  setData: (data: any, sourecOption?: ISourceCFG, clear?: boolean) => void;
  setDataItem: (featureId: number, newProperties: any, uniqueKey?: string) => void;
  addLayer: (layer: ILayer) => void;
  removeLayer: (layer: ILayer) => void;
  getLayers: () => ILayer[];
  setContainer: (container: Container) => void;
  initLayerList: () => void;
  destroy: () => void;
  getSelectFeatures?: () => Feature[];
  boxSelect: (bbox: BBox) => void;
  getLegendItem: () => any[];
}
export type LayerType = ILayerGroup;
export interface ILayerService extends EventEmitter {
  // init(container:Container):void;
  getLayer: (name: string) => LayerType;
  getLayers: () => LayerType[];
  getLayerSource: (name: string) => any;
  addLayer: (layer: LayerType) => void;
  removeLayer: (id: string) => void;
  addLayerGroup: (layer: LayerType) => void;
  removeLayerGroup: (id: string) => void;
}
