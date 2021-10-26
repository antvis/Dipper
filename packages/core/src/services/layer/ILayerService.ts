import type { ILayer, ISource } from '@antv/l7';
import type EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';

export interface ILayerEventTarget {
  type: 'add' | 'remove';
  target?: LayerType;
}
export interface ILayerGroup extends EventEmitter {
  name: string;
  source: ISource;
  show: () => void;
  hide: () => void;
  setContainer: (container: Container) => void;
  init: () => void;
  setData: (data: any) => void;
  addLayer: (layer: ILayer) => void;
  removeLayer: (layer: ILayer) => void;
  destroy: () => void;
  updateSource: (data: any) => void;
}
export type LayerType = ILayerGroup;
export interface ILayerService extends EventEmitter {
  // init(container:Container):void;
  getLayer: (name: string) => LayerType;
  addLayer: (layer: LayerType) => void;
  removeLayer: (id: string) => void;
}
