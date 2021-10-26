import type { ILayer, ISource } from '@antv/l7';
import EventEmitter from 'eventemitter3';
import type { Container } from 'inversify';
import { injectable, inject } from 'inversify';
import type { ILayerGroup } from './ILayerService';
import { TYPES } from '../../types';
import type { ISceneService } from '../scene/ISceneService';

export enum LayerGroupEventEnum {
  VISIBLE = 'visible',
  DESTROY = 'destroy',
  DATAUPDATE = 'dataupdate',
  SELECTFEATURECHANGE = 'selectfeaturechange',
  HOVERFEATURECHANGE = 'hoverfeaturechange',
}

@injectable()
export default abstract class LayerGroup
  extends EventEmitter
  implements ILayerGroup
{
  private layers: ILayer[] = [];
  private contianer!: Container;
  protected geodata: any;
  public source!: ISource;
  public visible: boolean = true;
  public name!: string;

  //   @inject(TYPES.LAYER_SYMBOL)
  //   protected layerService!: ILayerService;

  @inject(TYPES.SCENE_SYMBOL)
  protected sceneService!: ISceneService;

  public setContainer(container: Container) {
    this.contianer = container;
    this.sceneService = this.contianer.get(TYPES.SCENE_SYMBOL) as ISceneService;
  }

  public abstract init(): void;

  public updateSource(data: any) {
    this.source.setData(data);
  }

  public addLayer(layer: ILayer) {
    this.layers.push(layer);
    this.sceneService.scene?.addLayer(layer);
  }

  public getLayer(name: string) {
    return this.layers.find((l) => l.name === name);
  }

  public removeLayer(layer: ILayer) {
    const layerIndex = this.layers.findIndex((l) => l.id === layer.id);
    this.layers.splice(layerIndex, 1);
  }

  public setData(data: any) {
    this.geodata = data;
    this.source.setData(data);
    // 重置选中数据
    this.emit(LayerGroupEventEnum.HOVERFEATURECHANGE, []);
    this.emit(LayerGroupEventEnum.SELECTFEATURECHANGE, []);
    this.emit(LayerGroupEventEnum.DATAUPDATE);
  }

  public show() {
    this.layers.forEach((l) => l.show());
    this.visible = true;
    this.emit(LayerGroupEventEnum.VISIBLE, true);
  }

  public hide() {
    this.layers.forEach((l) => l.hide());
    this.visible = false;
    this.emit(LayerGroupEventEnum.VISIBLE, false);
  }

  public destroy() {
    this.layers.forEach((l) => l.destroy());
    this.emit(LayerGroupEventEnum.DESTROY);
  }
}
