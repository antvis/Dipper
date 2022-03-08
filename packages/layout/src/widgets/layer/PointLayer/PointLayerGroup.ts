import {
  getLayerFieldArgus,
  IFeature,
  ILayerFieldProperties,
  ILayerGroupOptions,
  LayerGroup,
  LayerGroupEventEnum,
} from '@antv/dipper-core';
import { Feature, featureCollection } from '@turf/turf';
import { PointLayer, ILayerConfig } from '@antv/l7';
import { merge } from 'lodash';

export interface IPointLayerStyle {
  size: ILayerFieldProperties<number>;
  color: ILayerFieldProperties<string>;
  shape: ILayerFieldProperties<string>;
  style?: any;
}

export interface IPointLayerGroupOptions extends ILayerGroupOptions {
  normal: IPointLayerStyle;
  select: false | IPointLayerStyle;
  autoFit: boolean;
  multipleSelect: boolean;
}

export const defaultPointLayerStyle: IPointLayerStyle = {
  size: 10,
  color: '#ff0000',
  shape: 'circle',
  style: {},
};

export const defaultPointLayerSelectStyle: IPointLayerStyle = {
  ...defaultPointLayerStyle,
  size: 15,
  color: '#0000ff',
};

export const defaultPointLayerOptions: IPointLayerGroupOptions = {
  normal: defaultPointLayerStyle,
  select: false,
  autoFit: false,
  multipleSelect: false,
};

export class PointLayerGroup extends LayerGroup<IPointLayerGroupOptions> {
  getDefaultOptions() {
    return defaultPointLayerOptions;
  }

  getSelectFeatures(): Feature[] {
    return [];
  }

  initLayerList() {
    const { normal, select, autoFit } = this.options;
    const pointLayer = this.initPointLayer({ name: 'point', autoFit }, normal);
    pointLayer.setData(this.data ?? featureCollection([]));

    if (select) {
      this.onLayerSelect(pointLayer);
      const mergeSelectOptions = merge({}, defaultPointLayerSelectStyle, select);
      const selectLayer = this.initPointLayer({ name: 'point' }, mergeSelectOptions);
      this.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, () => {
        selectLayer.setData(featureCollection(this.selectFeatures.map((item) => item.feature)));
      });
    }
  }

  initPointLayer(props: Partial<ILayerConfig>, options: IPointLayerStyle) {
    const { color, size, shape, style } = options;
    // @ts-ignore
    const layer = new PointLayer(props);
    layer
      .source(featureCollection([]))
      // @ts-ignore
      .color(...getLayerFieldArgus(color))
      // @ts-ignore
      .size(...getLayerFieldArgus(size))
      // @ts-ignore
      .shape(...getLayerFieldArgus(shape));

    style && layer.style(style);

    this.addLayer(layer);

    return layer;
  }

  setData(data: any) {
    super.setData(data);
    if (this.options.autoFit) {
      this.mainLayer?.fitBounds();
    }
  }

  getLegendItem() {
    // 先取默认图例
    return this.getLayer('point')?.getLegendItems('color') || [];
  }
}
