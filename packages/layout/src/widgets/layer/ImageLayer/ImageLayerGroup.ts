import type { IFeature, ILayerFieldProperties, ILayerGroupOptions } from '@antv/dipper-core';
import { getLayerFieldArgus, LayerGroup, LayerGroupEventEnum } from '@antv/dipper-core';
import { cloneDeep, isEqual, merge } from 'lodash';
import type { FeatureCollection } from '@turf/turf';
import { BBox, featureCollection } from '@turf/turf';
import type { ILayer, ISourceCFG } from '@antv/l7';
import { PointLayer } from '@antv/l7';

export interface IImageLayerImageStyle {
  minZoom: number;
  maxZoom: number;
  img: ILayerFieldProperties<string>;
  imgSize?: number;
  imgStyle?: Record<string, any>;
}

export interface IImageLayerStyle extends IImageLayerImageStyle {
  text?: string;
  textColor?: ILayerFieldProperties<string>;
  textSize?: number;
  textStyle?: any;
}

export interface IImageLayerGroupOptions extends ILayerGroupOptions {
  image: Record<string, string>;
  normal: IImageLayerStyle;
  select: false | IImageLayerStyle;
  autoFit?: boolean;
}

export const defaultImageLayerStyle: IImageLayerStyle = {
  minZoom: 0,
  maxZoom: 25,
  img: 'img',
  imgSize: 20,
  imgStyle: {},
  textColor: '#000000',
  textSize: 16,
  textStyle: {
    textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
    padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
  },
};

export const defaultImageLayerOptions: IImageLayerGroupOptions = {
  minZoom: 0,
  maxZoom: 25,
  image: {},
  normal: defaultImageLayerStyle,
  select: false,
  autoFit: true,
};

export class ImageLayerGroup extends LayerGroup<IImageLayerGroupOptions> {
  initLayerList() {
    const { normal, select } = this.options;
    this.initImage();

    const unselectLayers: ILayer[] = [];
    const selectLayers: ILayer[] = [];

    if (normal.img) {
      unselectLayers.push(this.initImageLayer('img', normal, this.data));
    }
    if (normal.text) {
      unselectLayers.push(this.initTextLayer('text', normal, this.data));
    }

    if (select) {
      const selectOptions = merge({}, defaultImageLayerStyle, select);
      selectLayers.push(this.initImageLayer('selectImg', selectOptions));
      if (select.text) {
        selectLayers.push(this.initTextLayer('selectText', selectOptions));
      }

      // 更新选中图层
      this.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, () => {
        let selectData: any = featureCollection([]);
        // 判断数据类型
        if (
          (this.options?.sourceOption && this.options.sourceOption?.parser?.type === 'json') ||
          this.options?.sourceOption?.parser?.type === 'csv'
        ) {
          selectData = this.selectFeatures.map((item) => item.feature);
        } else {
          selectData = featureCollection(this.selectFeatures.map((item) => item.feature));
        }
        selectLayers.forEach((layer) => layer.setData(selectData, this.options.sourceOption));
      });
      [...unselectLayers, ...selectLayers].forEach((layer) => {
        this.onLayerSelect(layer);
        layer.setBlend('normal');
      });
    }

    this.on(LayerGroupEventEnum.DATA_UPDATE, () => {
      unselectLayers.forEach((layer) => layer.setData(this.data, this.options.sourceOption));
      selectLayers.forEach((layer) => layer.setData(featureCollection([])));
    });
  }

  onClick = (e: IFeature) => {
    const currentSelectFeature = this.selectFeatures[0]?.feature;
    if (currentSelectFeature && isEqual(currentSelectFeature, e.feature)) {
      this.setSelectFeatures([]);
    } else {
      this.setSelectFeatures([e]);
    }
  };

  initImageLayer(
    name: string,
    style: IImageLayerStyle,
    data: FeatureCollection = featureCollection([]),
  ) {
    const { img, imgSize, imgStyle, minZoom, maxZoom } = style;
    const imageLayer = new PointLayer({
      name,
      minZoom,
      maxZoom,
      layerType: 'fillImage',
    });
    imageLayer
      .source(data, this.options.sourceOption)
      // @ts-ignore
      .size(imgSize)
      // @ts-ignore
      .shape(...getLayerFieldArgus(img))
      .style(imgStyle);

    this.addLayer(imageLayer);
    return imageLayer;
  }

  initTextLayer(
    name: string,
    style: IImageLayerStyle,
    data: FeatureCollection = featureCollection([]),
  ) {
    const { text, textSize = 0, textColor, textStyle } = style;

    const textLayer = new PointLayer({
      name,
    })
      .source(data, this.options.sourceOption)
      .shape(text ?? '', 'text')
      // @ts-ignore
      .size(textSize)
      // @ts-ignore
      .color(...getLayerFieldArgus(textColor))
      .style(textStyle);

    this.addLayer(textLayer);
    return textLayer;
  }

  initImage() {
    Object.entries(this.options.image ?? {}).forEach(([key, img]) => {
      this.scene?.addImage(key, img);
    });
  }

  getDefaultOptions() {
    return cloneDeep(defaultImageLayerOptions);
  }

  setData(data: any, options?: ISourceCFG) {
    super.setData(data, options);
    if (this.options.autoFit) {
      this.layers[0].fitBounds();
    }
  }
}
