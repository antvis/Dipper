import {
  LayerGroup,
  ILayerGroupOptions,
  ILayerFieldProperties,
  LayerGroupEventEnum,
  getLayerFieldArgus,
} from '@antv/dipper-core';
import { cloneDeep } from 'lodash';
import { BBox } from '@turf/turf';
import { featureCollection } from '_@turf_turf@6.5.0@@turf/turf';
import { PointLayer } from '@antv/l7';

export interface IPointLayerStyle {
  img?: ILayerFieldProperties<string>;
  imgSize?: ILayerFieldProperties<number>;
  text?: string;
  textSize?: ILayerFieldProperties<string>;
  textPlacement?: 'bottom' | 'top';
}

export interface IPointLayerGroupOptions extends ILayerGroupOptions {
  image: Record<string, string>;
  normal: IPointLayerStyle;
  select: boolean | IPointLayerStyle;
  autoFit?: boolean;
}

export const defaultPointLayerOptions: IPointLayerGroupOptions = {
  image: {},
  normal: {},
  select: false,
};

export class PointLayerGroup extends LayerGroup<IPointLayerGroupOptions> {
  initLayerList() {
    const { select } = this.options;

    this.initImage();
    const imageLayer = this.initImageLayer();
    this.source = imageLayer.getSource();
    this.initTextLayer();
  }

  initImageLayer() {
    const { normal, autoFit } = this.options;
    const { img, imgSize, ...style } = normal;
    const imageLayer = new PointLayer({
      name: 'image',
    });
    imageLayer
      .source(this.data ?? featureCollection([]))
      // @ts-ignore
      .size(...getLayerFieldArgus(imgSize))
      // @ts-ignore
      .shape(...getLayerFieldArgus(img))
      .style(style);

    if (autoFit) {
      imageLayer.fitBounds();
    }

    this.addLayer(imageLayer);
    return imageLayer;
  }

  initTextLayer() {
    const { normal } = this.options;
    const { text, textSize, textPlacement, ...style } = normal;
    const textLayer = new PointLayer({
      name: 'text',
    });
    textLayer
      .shape(text ?? 'text', 'text')
      // @ts-ignore
      .size(...getLayerFieldArgus(textSize))
      // @ts-ignore
      .style(style);

    textLayer.setSource(this.source);

    this.addLayer(textLayer);
    return textLayer;
  }

  initSelectImageLayer() {
    const { select } = this.options;
    if (!select) {
      return;
    }
    // const { img, imgSize, textPlacement } = select;
    const selectLayer = new PointLayer({
      name: 'select',
    });
    this.on(LayerGroupEventEnum.SELECT_FEATURE_CHANGE, () => {
      selectLayer.setData(
        featureCollection(this.selectFeatures.map((item) => item.feature)),
      );
    });
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
