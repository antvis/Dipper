import {
  LayerGroup,
  ILayerGroupOptions,
  getLayerFieldArgus,
  ILayerFieldProperties,
  ILayerGroupProps,
  LayerGroupEventEnum,
  ILayerGroupText,
  defaultGridTextOptions,
} from '@antv/dipper-core';
import { PointLayer, PolygonLayer } from '@antv/l7';
import { cloneDeep, merge } from 'lodash';
import { featureCollection, simplify } from '@turf/turf';

export interface IGridLayerGroupStyle {
  borderColor: ILayerFieldProperties<string>;
  borderWidth: ILayerFieldProperties<number>;
}

export interface IGridLayerGroupOptions extends ILayerGroupOptions {
  normal: IGridLayerGroupStyle & { fillColor: ILayerFieldProperties<string> };
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
  },
  text: false,
  select: true,
  hover: true,
};

export class GridLayerGroup extends LayerGroup<IGridLayerGroupOptions> {
  constructor(props: ILayerGroupProps<IGridLayerGroupOptions>) {
    super(props);
    const { normal, hover, select, text } = this.options;
    const fillLayer = this.initFillLayer();
    this.source = fillLayer.getSource();

    if (normal?.borderWidth) {
      this.initLineLayer();
    }
    if (text) {
      this.initTextLayer();
    }
    if (hover) {
      this.onLayerHover(fillLayer);
      this.initHoverLayer();
    }
    if (select) {
      this.onLayerSelect(fillLayer);
      this.initSelectLayer();
    }
  }

  getDefaultOptions() {
    return cloneDeep(defaultGridLayerOptions);
  }

  initFillLayer() {
    const {
      normal: { fillColor },
      autoFit = false,
    } = this.options;

    const fillLayer = new PolygonLayer({
      autoFit,
    });

    fillLayer
      .source(this.source)
      // @ts-ignore
      .color(...getLayerFieldArgus(fillColor))
      .shape('fill');

    this.addLayer(fillLayer);

    this.source = fillLayer.getSource();

    return fillLayer;
  }

  initLineLayer() {
    const {
      normal: { borderColor, borderWidth },
    } = this.options;

    const borderLayer = new PolygonLayer();

    borderLayer
      .shape('line')
      // @ts-ignore
      .color(...getLayerFieldArgus(borderColor))
      // @ts-ignore
      .size(...getLayerFieldArgus(borderWidth));

    borderLayer.setSource(this.source);
    this.addLayer(borderLayer);
  }

  initTextLayer() {
    const { field, stroke, strokeWidth, weight, color, size } = merge(
      defaultGridTextOptions,
      this.options.text,
    );

    const textLayer = new PolygonLayer()
      .shape(field || 'name', 'text')
      // @ts-ignore
      .size(...getLayerFieldArgus(size))
      // @ts-ignore
      .color(...getLayerFieldArgus(color))
      .style({
        // @ts-ignore
        // fontWeight: weight,
        stroke,
        strokeWidth,
        opacity: 1,
      });
    textLayer.setSource(this.source);
    this.addLayer(textLayer);
  }

  initHoverLayer() {
    const { borderColor, borderWidth } = merge(
      defaultGridHoverOptions,
      this.options.hover,
    );

    const hoverLayer = new PolygonLayer();
    hoverLayer
      .shape('line')
      // @ts-ignore
      .color(...getLayerFieldArgus(borderColor))
      // @ts-ignore
      .size(...getLayerFieldArgus(borderWidth))
      .source(featureCollection([]));

    this.addLayer(hoverLayer);

    this.on(LayerGroupEventEnum.HOVER_FEATURE_CHANGE, () => {
      hoverLayer.setData(
        featureCollection(this.hoverFeature ? [this.hoverFeature.feature] : []),
      );
    });
  }

  initSelectLayer() {
    const { borderColor, borderWidth } = merge(
      defaultGridSelectOptions,
      this.options.select,
    );

    const selectLayer = new PolygonLayer();

    selectLayer
      .shape('line')
      // @ts-ignore
      .color(...getLayerFieldArgus(borderColor))
      // @ts-ignore
      .size(...getLayerFieldArgus(borderWidth))
      .source(featureCollection([]));

    this.addLayer(selectLayer);

    this.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, () => {
      selectLayer.setData(
        featureCollection(this.selectFeatures.map((item) => item.feature)),
      );
    });
  }
}
