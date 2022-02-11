import {
  LayerGroup,
  ILayerGroupOptions,
  getLayerFieldArgus,
  ILayerFieldProperties,
  LayerGroupEventEnum,
  ILayerGroupText,
  defaultGridTextOptions,
  IFeature,
  ILayerScale,
} from '@antv/dipper-core';
import { PolygonLayer } from '@antv/l7';
import { cloneDeep, merge } from 'lodash';
import { BBox, featureCollection } from '@turf/turf';

export interface IGridLayerGroupStyle {
  borderColor: ILayerFieldProperties<string>;
  borderWidth: ILayerFieldProperties<number>;
}

export interface IGridLayerGroupOptions extends ILayerGroupOptions {
  normal: IGridLayerGroupStyle & {
    fillColor: ILayerFieldProperties<string>;
    scale?: ILayerScale;
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
      normal: { fillColor, scale },
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
      .shape('fill');

    if (scale) {
      // @ts-ignore
      fillLayer.scale(...(Array.isArray(scale) ? scale : [scale]));
    }

    this.addLayer(fillLayer);

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

  public boxSelect(bbox: BBox) {
    if (!this.options.multipleSelect) {
      return;
    }
    const fillLayer = this.layers.find((layer) => layer.name === 'fill');
    if (fillLayer) {
      // @ts-ignore
      fillLayer.boxSelect(bbox, (e) => {
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

  public getLegendItem() {
    // 先取默认图例
    let legend = this.getLayer('fill')?.getLegendItems('color') || [];
    if (legend.length !== 0) {
      return legend;
    }

    // @ts-ignore
    const scale =
      // @ts-ignore
      this.getLayer('fill')?.styleAttributeService?.getLayerAttributeScale(
        'color',
      );

    if (scale?.domain) {
      legend = scale
        .domain()
        .filter((item: any) => item !== 'label')
        .map((item: string | number) => {
          return {
            // @ts-ignore
            value: item || '无',
            color: scale(item),
          };
        });
    }
    return legend;
  }
}
