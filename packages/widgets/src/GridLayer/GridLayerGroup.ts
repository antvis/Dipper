import type { ILayerGroup } from '@antv/dipper-core';
import { LayerGroup, LayerGroupEventEnum, getColor } from '@antv/dipper-core';
import type { ILayer, IScaleOptions } from '@antv/l7';
import { LineLayer, PolygonLayer, Source } from '@antv/l7';
import type { IFeature, IGridLayerProps, ILayerGroupOption } from './common';
import { blankData, uniqFeatures, fromPairs } from './common';

export type IGridLayerGroup = ILayerGroup & {
  getLegendItem: () => any;
  updateProperties: (props: Record<string, any>[]) => any;
};

export class GridLayerGroup extends LayerGroup implements ILayerGroup {
  private hoverLayer: ILayer | undefined;
  private clickLayer: ILayer | undefined;
  private selectFeatures: any[] = [];
  private hoverFeature: any;
  private options: Partial<ILayerGroupOption> = {};
  private currentActiveFeatureId: number = -1;
  private currentSelectFeatureId: number = -1;

  constructor({ name, data, options }: IGridLayerProps) {
    super();
    this.name = name;
    this.data = data;
    this.options = options;
  }

  public init() {
    this.initSource();
    this.addFillLayer();
    this.addLineLayer();
    this.addTextLayer();
    this.addClickHightLayer();
    this.addHoverHightLayer();
    this.on(LayerGroupEventEnum.DATAUPDATE, this.resetActive);
  }

  initSource() {
    this.source = new Source(this.data);
  }
  getLegendItem() {
    // 先取默认图例
    let legend = this.getLayer(this.name)?.getLegendItems('color') || [];
    if (legend.length !== 0) {
      return legend;
    }

    // @ts-ignore
    const scale =
      // @ts-ignore
      this.getLayer(this.name)?.styleAttributeService?.getLayerAttributeScale(
        'color',
      );

    if (scale?.domain) {
      legend = scale
        .domain()
        .filter((item: any) => item !== 'label')
        .map((item: string | number) => {
          return {
            // @ts-ignore
            value: item || this.options.fill.unkownName || '无',
            color: scale(item),
          };
        });
    }
    return legend;
  }
  addFillLayer() {
    let color = this.options.fill?.color;
    const fillLayer = new PolygonLayer({
      autoFit: false,
      name: this.name,
    })
      .source(this.source)
      .shape('fill')
      .scale({
        [this.options.fill!.field]: this.options.fill?.scale,
      } as IScaleOptions)
      .color(this.options.fill!.field, color)
      .style({ opacity: this.options.fill?.opacity || 0.8 });

    fillLayer.once('inited', () => {
      fillLayer.fitBounds();
    });
    fillLayer.on('click', this.clickHandler.bind(this));
    fillLayer.on('mousemove', this.hoverHandler.bind(this));
    fillLayer.on('unclick', () => {
      this.selectFeatures = [];
      this.updateSelectLayer();
    });
    fillLayer.on('mouseout', this.hoverHandler.bind(this));
    this.addLayer(fillLayer);
    this.source = fillLayer.getSource();
  }

  addLineLayer() {
    const linelayer = new PolygonLayer()
      .shape('line')
      // @ts-ignore
      .size(1)
      .color('#fff')
      .style({ opacity: 1.0 });
    linelayer.setSource(this.source);
    this.addLayer(linelayer);
  }
  // 添加文本标注
  addTextLayer() {
    const textlayer = new PolygonLayer({
      zIndex: 20,
    })
      .source(this.source)
      .shape(this.options?.label?.field || 'name', 'text')
      .size(12)
      .color('#000')
      .style({
        fontWeight: 400,
        stroke: '#fff',
        strokeWidth: 1.5,
        opacity: 1.0,
      });
    textlayer.setSource(this.source);
    this.addLayer(textlayer);
  }
  // hover 高亮图层
  addHoverHightLayer() {
    const layer = new LineLayer({
      name: 'highlightLayer',
      zIndex: 10,
    })
      .source(blankData)
      .shape('line')
      .size(2)
      .color('#fff')
      .style({ opacity: 1.0 });

    this.hoverLayer = layer;
    this.addLayer(layer);
  }

  // 点击高亮图层
  addClickHightLayer() {
    const clicklayer = new PolygonLayer({
      name: 'clickHighlightLayer',
      zIndex: 11,
    })
      .source(blankData)
      .color('#65789B')
      .size(1)
      .shape('line')
      .style({ opacity: 1 });
    this.addLayer(clicklayer);
    this.clickLayer = clicklayer;
  }

  updateProperties(props: { id: string; properties: any }[]) {
    const map: Record<string, any> = fromPairs(
      props.map((item) => [item.id, item.properties]),
    );
    this.data.features = this.data.features.map((item: any) => {
      const { id } = item.properties;
      const newProperties = map[id];
      if (newProperties) {
        Object.assign(item.properties, newProperties);
      }
      return item;
    });
    this.updateSource(this.data);
    this.emit(LayerGroupEventEnum.DATAUPDATE);
  }

  clickHandler(e: any) {
    const { target } = e;
    if (target.shiftKey) {
      // 多选
      this.selectFeatures = uniqFeatures(this.selectFeatures, e);
    } else if (
      this.selectFeatures.length === 1 && // 取消选中
      this.selectFeatures[0].featureId === e.featureId
    ) {
      // 单选
      this.selectFeatures = [];
    } else {
      this.selectFeatures = [e];
    }
    //
    this.updateSelectLayer();
  }

  hoverHandler(e: IFeature) {
    this.hoverFeature = e.feature ? e : null;
    if (this.currentActiveFeatureId !== e.featureId) {
      this.hoverLayer?.setData({
        type: 'FeatureCollection',
        features: e.feature ? [e.feature] : [],
      });
      this.emit(LayerGroupEventEnum.HOVERFEATURECHANGE, this.hoverFeature);
    }
    this.currentActiveFeatureId = e.featureId || -1;
  }

  updateSelectLayer() {
    this.emit(LayerGroupEventEnum.SELECTFEATURECHANGE, this.selectFeatures);
    this.clickLayer?.setData({
      type: 'FeatureCollection',
      features: this.selectFeatures.map((f: IFeature) => f.feature),
    });
  }

  resetActive() {
    this.clickLayer?.setData({
      type: 'FeatureCollection',
      features: [],
    });
    this.hoverLayer?.setData({
      type: 'FeatureCollection',
      features: [],
    });
  }

  setSelectFeatureById(id: string) {
    console.log(id);
    const feature = this.data.features.find((f: any) => {
      return f.properties.id === id;
    });
    if (feature) {
      this.selectFeatures = [
        {
          feature,
        },
      ];
      this.updateSelectLayer();
    }
  }

  getSelectFeatures() {
    return this.selectFeatures || [];
  }
}
