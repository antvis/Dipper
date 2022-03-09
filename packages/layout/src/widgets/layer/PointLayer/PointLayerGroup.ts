import { ILayerGroupOptions, LayerGroup } from '@antv/dipper-core';
import { Feature } from '@turf/turf';

export interface IPointLayerGroupOptions extends ILayerGroupOptions {}

export const defaultPointLayerOptions: IPointLayerGroupOptions = {};

export class PointLayerGroup extends LayerGroup {
  getDefaultOptions(): ILayerGroupOptions {
    return defaultPointLayerOptions;
  }

  getSelectFeatures(): Feature[] {
    return [];
  }

  initLayerList(): void {}
}
