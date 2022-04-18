import type {
  ILayerGroupOptions,
  ILayerFieldProperties,
  ILayerGroupText,
  ILayerScale,
} from '@antv/dipper-core';
import {
  LayerGroup,
  getLayerFieldArgus,
  LayerGroupEventEnum,
  defaultGridTextOptions,
} from '@antv/dipper-core';
import { PolygonLayer } from '@antv/l7';
import { cloneDeep, merge } from 'lodash';
import { featureCollection } from '@turf/turf';

export interface IGridLayerGroupStyle {
  borderColor: ILayerFieldProperties<string>;
  borderWidth: ILayerFieldProperties<number>;
}

export interface IGridLayerGroupOptions extends ILayerGroupOptions {
  normal: IGridLayerGroupStyle & {
    fillColor: ILayerFieldProperties<string>;
    scale?: ILayerScale;
    style?: Record<string, any>;
    borderStyle?: Record<string, any>;
  };
  autoFit?: boolean;
  text: boolean | ILayerGroupText;
  select?: boolean | IGridLayerGroupStyle;
  hover?: boolean | IGridLayerGroupStyle;
}

export const defaultGridHoverOptions = {
  borderColor: '#ffffff',
  borderWidth: 2,
};

export const defaultGridSelectOptions = {
  borderColor: '#000000',
  borderWidth: 1,
};

export const defaultGridLayerOptions: IGridLayerGroupOptions = {
  normal: {
    fillColor: '#1990FF',
    borderColor: '#1990FF',
    borderWidth: 0,
    style: {},
    borderStyle: {},
  },
  text: false,
  select: true,
  hover: true,
  multipleSelect: false,
};

export class GridLayerGroup extends LayerGroup<IGridLayerGroupOptions> {
  initLayerList() {
    const { normal, hover, select, text } = this.options;
    const fillLayer = this.initFillLayer();
    this.source = fillLayer.getSource();

    if (normal?.borderWidth) {
      this.initLineLayer();
    }
    if (hover) {
      this.onLayerHover(fillLayer);
      this.initHoverLayer();
    }
    if (select) {
      this.onLayerSelect(fillLayer);
      this.initSelectLayer();
    }
    if (text) {
      this.initTextLayer();
    }
  }

  getDefaultOptions() {
    return cloneDeep(defaultGridLayerOptions);
  }

  initFillLayer() {
    const {
      normal: { fillColor, scale, style, ...otherStyle },
      autoFit = false,
    } = this.options;

    const fillLayer = new PolygonLayer({
      name: 'fill',
      autoFit,
    });

    fillLayer
      .source(this.data ?? featureCollection([]))
      // @ts-ignore
      .color(...getLayerFieldArgus(fillColor))
      .shape('fill')
      .style({
        ...otherStyle,
        ...style,
      });

    if (scale) {
      // @ts-ignore
      fillLayer.scale(...(Array.isArray(scale) ? scale : [scale]));
    }

    this.addLayer(fillLayer);

    return fillLayer;
  }

  initLineLayer() {
    const {
      normal: { borderColor, borderWidth, borderStyle, ...otherStyle },
    } = this.options;

    const borderLayer = new PolygonLayer();

    borderLayer
      .shape('line')
      // @ts-ignore
      .color(...getLayerFieldArgus(borderColor))
      // @ts-ignore
      .size(...getLayerFieldArgus(borderWidth))
      // @ts-ignore
      .style({
        ...otherStyle,
        ...borderStyle,
      });

    borderLayer.setSource(this.source);
    this.addLayer(borderLayer);
  }

  initTextLayer() {
    const { field, color, size, ...style } = merge(
      defaultGridTextOptions,
      this.options.text,
    ) as ILayerGroupText;

    const textLayer = new PolygonLayer()
      .shape(field || 'name', 'text')
      // @ts-ignore
      .size(...getLayerFieldArgus(size))
      // @ts-ignore
      .color(...getLayerFieldArgus(color))
      // @ts-ignore
      .style(style);
    textLayer.setSource(this.source);
    this.addLayer(textLayer);
  }

  initHoverLayer() {
    const { borderColor, borderWidth, ...style } = merge(
      defaultGridHoverOptions,
      this.options.hover,
    ) as IGridLayerGroupStyle;

    const hoverLayer = new PolygonLayer();
    hoverLayer
      .shape('line')
      // @ts-ignore
      .color(...getLayerFieldArgus(borderColor))
      // @ts-ignore
      .size(...getLayerFieldArgus(borderWidth))
      .source(featureCollection([]))
      .style(style);

    this.addLayer(hoverLayer);

    this.on(LayerGroupEventEnum.HOVER_FEATURE_CHANGE, () => {
      hoverLayer.setData(featureCollection(this.hoverFeature ? [this.hoverFeature.feature] : []));
    });
  }

  initSelectLayer() {
    const { borderColor, borderWidth, ...style } = merge(
      defaultGridSelectOptions,
      this.options.select,
    ) as IGridLayerGroupStyle;

    const selectLayer = new PolygonLayer();

    selectLayer
      .shape('line')
      // @ts-ignore
      .color(...getLayerFieldArgus(borderColor))
      // @ts-ignore
      .size(...getLayerFieldArgus(borderWidth))
      .source(featureCollection([]))
      .style(style);

    this.addLayer(selectLayer);

    this.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, () => {
      selectLayer.setData(featureCollection(this.selectFeatures.map((item) => item.feature)));
    });
  }

  public getLegendItem() {
    // 先取默认图例
    return this.getLayer('fill')?.getLegendItems('color') || [];
  }
}
