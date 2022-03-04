import type { ILayer } from '@antv/l7';
import EventEmitter from 'eventemitter3';
import { Container, injectable } from 'inversify';
import type { ILayerGroup, IFeature } from './ILayerService';
import { Source, MarkerLayer, Scene } from '@antv/l7';
import {
  BBox,
  Feature,
  FeatureCollection,
  featureCollection,
} from '@turf/turf';
import { isEqual, merge } from 'lodash';
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
  select?: false | any;
  multipleSelect?: boolean;
}

export interface ILayerGroupText {
  field: string;
  color: ILayerFieldProperties<string>;
  size: ILayerFieldProperties<number>;
  weight: number;
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
export default abstract class LayerGroup<
    T extends ILayerGroupOptions = ILayerGroupOptions,
  >
  extends EventEmitter<LayerGroupEventEnum>
  implements ILayerGroup
{
  protected layers: ILayer[] = [];

  protected visible = true;

  name: string;

  data: any;

  options: T;

  source: Source;

  container?: Container;

  selectFeatures: IFeature[] = [];

  hoverFeature?: IFeature | null = null;

  get scene(): Scene | undefined {
    return (
      this.container?.get(TYPES.SCENE_SYMBOL) as ISceneService | undefined
    )?.getScene();
  }

  get mainLayer() {
    return this.layers[0];
  }

  constructor({ name, data, options }: ILayerGroupProps<T>) {
    super();
    this.name = name;
    this.data = data;
    this.options = merge({}, this.getDefaultOptions(), options);
    this.source = new Source(featureCollection([]));
  }

  setContainer(container: Container) {
    this.container = container;
  }

  abstract initLayerList(): void;

  abstract getDefaultOptions(): T;

  addLayer(layer: ILayer) {
    this.layers.push(layer);
    // 在layerService.addLayer()前的layer不会通过此处注册进scene中，而是在LayerService中的addLayer中完成注册
    if (layer instanceof MarkerLayer) {
      this.scene?.addMarkerLayer(layer);
    } else {
      this.scene?.addLayer(layer);
    }
  }

  getLayer(name: string) {
    return this.layers.find((l) => l.name === name);
  }

  getLayers() {
    return this.layers;
  }

  onLayerHover(layer: ILayer) {
    if (this.options.hover) {
      layer.on('mouseenter', this.onMouseMove);
      layer.on('mousemove', this.onMouseMove);
      layer.on('mouseout', this.onMouseOut);
    }
  }

  offLayerHover(layer: ILayer) {
    if (this.options.hover) {
      layer.off('mouseenter', this.onMouseMove);
      layer.off('mousemove', this.onMouseMove);
      layer.off('mouseout', this.onMouseOut);
    }
  }

  onLayerSelect(layer: ILayer) {
    if (this.options.select) {
      layer.on('click', this.onClick);
    }
  }

  offLayerSelect(layer: ILayer) {
    if (this.options.select) {
      layer.off('click', this.onClick);
    }
  }

  onClick = (e: IFeature) => {
    const isMultipleSelect = isPressing(16) && !!this.options.multipleSelect;
    const hasSelectFeature = this.selectFeatures.find(
      (item) => item.featureId === e.featureId,
    );
    if (hasSelectFeature) {
      if (isMultipleSelect) {
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
    } else if (isMultipleSelect) {
      this.setSelectFeatures([...this.selectFeatures, e]);
    } else {
      this.setSelectFeatures([e]);
    }
  };

  onMouseMove = (e: IFeature) => {
    if (e.featureId !== this.hoverFeature?.featureId) {
      this.setHoverFeature(e);
    }
  };

  onMouseOut = () => {
    this.setHoverFeature(null);
  };

  setHoverFeature(feature?: IFeature | null) {
    this.hoverFeature = feature;
    this.emit(LayerGroupEventEnum.HOVER_FEATURE_CHANGE, feature);
  }

  setSelectFeatures(features: IFeature[]) {
    if (this.selectFeatures.length !== features.length || features.length) {
      this.selectFeatures = features;
      this.emit(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, features);
    }
  }

  removeLayer(layer: ILayer) {
    const layerIndex = this.layers.findIndex((l) => l.id === layer.id);
    this.layers.splice(layerIndex, 1);
    this.scene?.removeLayer(layer);
  }

  /**
   * 更新数据
   * @param data
   */
  setData(data: any) {
    this.data = data;
    this.source.setData(data);

    if (this.mainLayer && this.mainLayer?.getSource() !== this.source) {
      this.mainLayer.setData(data);
    }

    this.setSelectFeatures([]);
    this.setHoverFeature(null);
    // 重置选中数据
    this.emit(LayerGroupEventEnum.DATA_UPDATE, data);
  }

  setDataItem(featureId: number, newProperties: Record<string, any>) {
    const source = this.layers[0]?.getSource();
    if (source) {
      const targetFeature = source.getFeatureById(featureId) as Feature | null;
      const targetIndex = this.data.features.findIndex((item: Feature) =>
        isEqual(item, targetFeature),
      );
      if (targetFeature && targetIndex > -1) {
        Object.assign(targetFeature.properties, newProperties);
        this.data.features[targetIndex] = targetFeature;
        this.source.setData(this.data);
      }
    }
  }

  setDataItemByKey(
    key: string,
    value: any,
    newProperties: Record<string, any>,
  ) {
    this.data.features.find((feature: Feature) => {
      if (feature.properties?.[key] === value) {
        Object.assign(feature.properties, newProperties);
        this.source.setData(this.data);
      }
    });
  }

  /**
   * 显示所有图层
   */
  show() {
    this.layers.forEach((layer) => layer.show());
    this.visible = true;
    this.emit(LayerGroupEventEnum.VISIBLE_CHANGE, true);
  }

  hide() {
    this.layers.forEach((layer) => layer.hide());
    this.visible = false;
    this.emit(LayerGroupEventEnum.VISIBLE_CHANGE, false);
  }

  destroy() {
    this.layers.forEach((layer) => layer.destroy());
    this.emit(LayerGroupEventEnum.DESTROY);
  }

  boxSelect(bbox: BBox) {
    if (!this.options.multipleSelect) {
      return;
    }
    const mainLayer = this.mainLayer;
    if (mainLayer) {
      // @ts-ignore
      mainLayer.boxSelect(bbox, (e) => {
        if (this.selectFeatures.length === e.length) {
          return;
        }
        const newSelectFeatures: IFeature[] = (Array.from(e) ? e : []).map(
          ({ pickedFeatureIdx: featureId, ...feature }: any) => {
            return {
              featureId,
              feature,
            };
          },
        );
        if (
          newSelectFeatures.map((item) => item.featureId).join(',') !==
          this.selectFeatures.map((item) => item.featureId).join(',')
        ) {
          this.setSelectFeatures(newSelectFeatures);
        }
      });
    }
  }

  getLegendItem(): any[] {
    return [];
  }
}
