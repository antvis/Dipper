import EventEmitter from 'eventemitter3';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import type { ISceneService } from '../scene/ISceneService';
import type { ILayerService, LayerType } from './ILayerService';

export enum LayerEventEnum {
  LAYERCHANGE = 'layerchange',
}

@injectable()
export default class LayerService extends EventEmitter implements ILayerService {
  protected layerStore: LayerType[] = [];

  @inject(TYPES.SCENE_SYMBOL)
  protected sceneService!: ISceneService;

  getLayer(name: string) {
    return this.layerStore.find((layer) => layer.name === name) as LayerType;
  }

  getLayers() {
    return this.layerStore;
  }

  getLayerSource(name: string) {
    const layerProerty = this.layerStore.find((layer) => layer.name === name) as LayerType;
    return layerProerty?.data;
  }

  addLayer(layer: LayerType) {
    this.layerStore.push(layer);
    layer.setContainer(this.sceneService.container);
    layer.initLayerList();
    this.emit(LayerEventEnum.LAYERCHANGE, {
      type: 'add',
      target: layer,
    });
  }

  removeLayer(name: string) {
    const layerIndex = this.layerStore.findIndex((l) => l.name === name);
    const removeed = this.layerStore.splice(layerIndex, 1)[0];
    this.emit(LayerEventEnum.LAYERCHANGE, {
      type: 'remove',
      name: removeed.name,
    });
    removeed?.destroy();
  }

  addLayerGroup(layer: LayerType) {
    this.addLayer(layer);
  }

  removeLayerGroup(name: string) {
    this.removeLayer(name);
  }
}
