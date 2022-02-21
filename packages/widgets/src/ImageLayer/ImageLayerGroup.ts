import {
  getLayerFieldArgus,
  ILayerFieldProperties,
  ILayerGroupOptions,
  LayerGroup,
  LayerGroupEventEnum,
} from '@antv/dipper-core';
import { cloneDeep, merge } from 'lodash';
import { BBox, Feature, featureCollection } from '@turf/turf';
import { ILayer, PointLayer } from '@antv/l7';

export interface IImageLayerStyle {
  img?: ILayerFieldProperties<string>;
  imgSize?: number;
  imgStyle?: any;
  text?: string;
  textColor?: ILayerFieldProperties<string>;
  textSize?: number;
  textStyle?: {
    [key: string]: any;
  };
}

export interface IImageLayerGroupOptions extends ILayerGroupOptions {
  image: Record<string, string>;
  normal: IImageLayerStyle;
  select: false | IImageLayerStyle;
  autoFit?: boolean;
}

export const defaultImageLayerStyle: IImageLayerStyle = {
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
  image: {},
  normal: defaultImageLayerStyle,
  select: false,
  autoFit: true,
};

export class ImageLayerGroup extends LayerGroup<IImageLayerGroupOptions> {
  get unselectFeatures() {
    return this.data.features.filter(
      (feature: Feature) =>
        !this.selectFeatures.find((item) => item.feature === feature),
    );
  }

  initLayerList() {
    const { normal, select } = this.options;
    this.initImage();

    const unselectLayers: ILayer[] = [];
    const selectLayers: ILayer[] = [];

    if (normal.img) {
      unselectLayers.push(this.initImageLayer(normal));
    }
    if (normal.text) {
      unselectLayers.push(this.initTextLayer(normal));
    }

    // if (select) {
    //   const selectOptions = merge({}, defaultImageLayerStyle, select);
    //   if (select.img) {
    //     selectLayers.push(this.initImageLayer(selectOptions));
    //   }
    //   if (select.text) {
    //     selectLayers.push(this.initTextLayer(selectOptions));
    //   }
    //   unselectLayers.forEach((layer) => this.onLayerSelect(layer));
    //
    //   this.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, () => {
    //     const unselectData = featureCollection(this.unselectFeatures);
    //     const selectData = featureCollection(
    //       this.selectFeatures.map((item) => item.feature),
    //     );
    //     debugger;
    //
    //     unselectLayers.forEach((layer) => layer.setData(unselectData));
    //     selectLayers.forEach((layer) => layer.setData(selectData));
    //   });
    // }

    this.on(LayerGroupEventEnum.DATA_UPDATE, () => {
      unselectLayers.forEach((layer) => layer.setData(this.data));
      selectLayers.forEach((layer) => layer.setData(featureCollection([])));
    });
  }

  initImageLayer(style: IImageLayerStyle) {
    const { img, imgSize, imgStyle } = style;
    const imageLayer = new PointLayer({
      name: 'image',
    });
    imageLayer
      .source(this.data ?? featureCollection([]))
      // @ts-ignore
      .size(imgSize)
      // @ts-ignore
      .shape(...getLayerFieldArgus(img))
      .style(imgStyle);

    this.addLayer(imageLayer);
    return imageLayer;
  }

  initTextLayer(style: IImageLayerStyle) {
    const { text, textSize = 0, textStyle, textColor } = style;

    const textLayer = new PointLayer({
      name: 'text',
    })
      .source(this.data ?? featureCollection([]))
      .shape(text ?? '', 'text')
      // @ts-ignore
      .size(textSize)
      // @ts-ignore
      .color(...getLayerFieldArgus(textColor))
      .style({
        ...textStyle,
      });

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

  setData(data: any) {
    super.setData(data);
    if (this.options.autoFit) {
      this.layers[0].fitBounds();
    }
  }

  public boxSelect(bbox: BBox) {}

  public getLegendItem() {
    return [];
    // 先取默认图例
    // return this.getLayer('fill')?.getLegendItems('color') || [];
  }
}
