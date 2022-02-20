import { LayerGroup, ILayerGroupOptions } from '@antv/dipper-core';
import { cloneDeep } from 'lodash';
import { BBox } from '@turf/turf';

export interface IPointLayerGroupOptions extends ILayerGroupOptions {
  image: Record<string, string>;
}
export const defaultPointLayerOptions: IPointLayerGroupOptions = {
  image: {},
};

export class PointLayerGroup extends LayerGroup<IPointLayerGroupOptions> {
  initLayerList() {
    this.initImage();
  }

  initImage() {
    Object.entries(this.options.image ?? {}).forEach(([key, img]) => {
      this.scene?.addImage(key, img);
    });
  }

  getDefaultOptions() {
    return cloneDeep(defaultPointLayerOptions);
  }

  public boxSelect(bbox: BBox) {}

  public getLegendItem() {
    return [];
    // 先取默认图例
    // return this.getLayer('fill')?.getLegendItems('color') || [];
  }
}
