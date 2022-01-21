import type { ILayer, ISource } from '@antv/l7';
import { Feature } from '@turf/turf';
import type EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';

export interface IFeature {
  featureId: number;
  feature: Feature;
  lngLat: {
    lng: number;
    lat: number;
  };
  target: MouseEvent;
}

export interface ILayerEventTarget {
  type: 'add' | 'remove';
  target?: LayerType;
}

export interface ILayerGroup extends EventEmitter {
  data: any;
  name: string;
  source?: ISource;
  show: () => void;
  hide: () => void;
  setData: (data: any) => void;
  addLayer: (layer: ILayer) => void;
  removeLayer: (layer: ILayer) => void;
  getLayers: () => ILayer[];
  setContainer: (container: Container) => void;
  initLayerList: () => void;
  destroy: () => void;
  getSelectFeatures?: () => Feature[];
}
export type LayerType = ILayerGroup;
export interface ILayerService extends EventEmitter {
  // init(container:Container):void;
  getLayer: (name: string) => LayerType;
  getLayers: () => LayerType[];
  getLayerSource: (name: string) => any;
  addLayer: (layer: LayerType) => void;
  removeLayer: (id: string) => void;
}
