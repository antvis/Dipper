import type { ILayerService } from './ILayerService';
import type { Container } from 'inversify';
import { injectable, inject } from 'inversify';
import EventEmitter from 'eventemitter3';
import type { LayerType } from './ILayerService';
import type { ISceneService } from '../scene/ISceneService';
import { TYPES } from '../../types';

export enum LayerEventEnum {
  LAYERCHANGE = 'layerchange',
}

@injectable()
export default class LayerService
  extends EventEmitter
  implements ILayerService
{
  protected layerStore: LayerType[] = [];

  // private container: Container | undefined = undefined;

  @inject(TYPES.SCENE_SYMBOL)
  protected sceneService!: ISceneService;

  getLayer(name: string) {
    return this.layerStore.find((layer) => layer.name === name) as LayerType;
  }

  addLayer(layer: LayerType) {
    this.layerStore.push(layer);
    layer.setContainer(this.sceneService?.container as Container);
    layer.init();
    this.emit(LayerEventEnum.LAYERCHANGE, {
      type: 'add',
      target: layer,
    });
  }

  removeLayer(name: string) {
    const layerIndex = this.layerStore.findIndex((l) => l.name === name);
    const removeed = this.layerStore.splice(layerIndex, 1)[0];
    removeed?.destroy();
    this.emit(LayerEventEnum.LAYERCHANGE, {
      type: 'remove',
    });
  }
}
