import type { ILayer } from '@antv/l7';
import EventEmitter from 'eventemitter3';
import { Container, injectable } from 'inversify';
import type { ILayerGroup, IFeature } from './ILayerService';
import { Source } from '@antv/l7';
import { BBox, FeatureCollection, featureCollection } from '@turf/turf';
import { merge } from 'lodash';
import { isPressing } from '../../utils/keyboard';
import { TYPES } from '../../types';
import { ISceneService } from '../scene/ISceneService';
import { DeepPartial } from '../../utils';
import {
  IScale,
  IScaleOptions,
} from '@antv/l7-core/es/services/layer/IStyleAttributeService';

export enum LayerGroupEventEnum {
  VISIBLE_CHANGE = 'visibleChange',
  DESTROY = 'destroy',
  DATA_UPDATE = 'dataUpdate',
  SELECT_FEATURE_CHANGE = 'selectFeatureChange',
  HOVER_FEATURE_CHANGE = 'hoverFeatureChange',
}

export type ILayerFieldProperties<T> =
  | T
  | { field: string; value: T | ((field: string) => T) };

export type ILayerScale = IScaleOptions | [string, IScale];

export const getLayerFieldArgus = <T>(properties: ILayerFieldProperties<T>) => {
  if (properties instanceof Object) {
    const { field, value } = properties;
    return [field, value];
  }
  return [properties];
};

export interface ILayerGroupOptions {
  hover?: false | any;
  active?: false | any;
}

export interface ILayerGroupText {
  field: string;
  color: ILayerFieldProperties<string>;
  size: ILayerFieldProperties<number>;
  weight: number;
  stroke: string;
  strokeWidth: number;
}

export const defaultGridTextOptions = {
  field: 'name',
  color: '#000000',
  size: 14,
  weight: 400,
  stroke: '#ffffff',
  strokeWidth: 2,
};

export interface ILayerGroupProps<T = any> {
  name: string;
  data?: any[] | FeatureCollection | any;
  options: DeepPartial<T>;
}

@injectable()
export default abstract class LayerGroup<T = any>
  extends EventEmitter<LayerGroupEventEnum>
  implements ILayerGroup
{
  protected layers: ILayer[] = [];
  protected visible = true;

  public name: string;
  public data: any;
  public options: T;
  public source: Source;
  public container?: Container;

  public selectFeatures: IFeature[] = [];
  public hoverFeature?: IFeature | null = null;

  public get scene() {
    return (
      this.container?.get(TYPES.SCENE_SYMBOL) as ISceneService | undefined
    )?.getScene();
  }

  constructor({ name, data, options }: ILayerGroupProps<T>) {
    super();
    this.name = name;
    this.data = data;
    this.options = merge({}, this.getDefaultOptions(), options);
    this.source = new Source(featureCollection([]));
  }

  // 会被LayerService调用
  public setContainer(container: Container) {
    this.container = container;
  }

  public abstract initLayerList(): void;

  public abstract getDefaultOptions(): T;

  public addLayer(layer: ILayer) {
    this.layers.push(layer);
    // 在layerService.addLayer()前的layer不会通过此处注册进scene中，而是在LayerService中的addLayer中完成注册
    this.scene?.addLayer(layer);
  }

  public getLayer(name: string) {
    return this.layers.find((l) => l.name === name);
  }

  public getLayers() {
    return this.layers;
  }

  public boxSelect(bbox: BBox) {}

  public onLayerHover(layer: ILayer) {
    layer.on('mouseenter', this.onMouseMove);
    layer.on('mousemove', this.onMouseMove);
    layer.on('mouseout', this.onMouseOut);
  }

  public offLayerHover(layer: ILayer) {
    layer.off('mouseenter', this.onMouseMove);
    layer.off('mousemove', this.onMouseMove);
    layer.off('mouseout', this.onMouseOut);
  }

  public onLayerSelect(layer: ILayer) {
    layer.on('click', this.onClick);
  }

  public offLayerSelect(layer: ILayer) {
    layer.off('click', this.onClick);
  }

  public onClick = (e: IFeature) => {
    const isPressShift = isPressing(16);
    const hasSelectFeature = this.selectFeatures.find(
      (item) => item.featureId === e.featureId,
    );
    if (hasSelectFeature) {
      if (isPressShift) {
        this.setSelectFeatures(
          [...this.selectFeatures].filter(
            (item) => item.featureId !== e.featureId,
          ),
        );
      } else if (this.selectFeatures.length > 1) {
        this.setSelectFeatures([e]);
      } else {
        this.setSelectFeatures([]);
      }
    } else if (isPressShift) {
      this.setSelectFeatures([...this.selectFeatures, e]);
    } else {
      this.setSelectFeatures([e]);
    }
  };

  public onMouseMove = (e: IFeature) => {
    if (e.featureId !== this.hoverFeature?.featureId) {
      this.setHoverFeature(e);
    }
  };

  public onMouseOut = () => {
    this.setHoverFeature(null);
  };

  public setHoverFeature(feature?: IFeature | null) {
    this.hoverFeature = feature;
    this.emit(LayerGroupEventEnum.HOVER_FEATURE_CHANGE, feature);
  }

  public setSelectFeatures(features: IFeature[]) {
    this.selectFeatures = features;
    this.emit(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, features);
  }

  public removeLayer(layer: ILayer) {
    const layerIndex = this.layers.findIndex((l) => l.id === layer.id);
    this.layers.splice(layerIndex, 1);
    this.scene?.removeLayer(layer);
  }

  public setData(data: any) {
    this.data = data;
    this.source.setData(data);

    this.setSelectFeatures([]);
    this.setHoverFeature(null);
    // 重置选中数据
    this.emit(LayerGroupEventEnum.DATA_UPDATE, data);
  }

  public show() {
    this.layers.forEach((layer) => layer.show());
    this.visible = true;
    this.emit(LayerGroupEventEnum.VISIBLE_CHANGE, true);
  }

  public hide() {
    this.layers.forEach((layer) => layer.hide());
    this.visible = false;
    this.emit(LayerGroupEventEnum.VISIBLE_CHANGE, false);
  }
  public destroy() {
    this.layers.forEach((layer) => layer.destroy());
    this.emit(LayerGroupEventEnum.DESTROY);
  }
}
