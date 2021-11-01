import type { ILayerGroup } from '@antv/dipper-core';
import { LayerGroup, LayerGroupEventEnum } from '@antv/dipper-core';
import type { ILayer } from '@antv/l7';
import { LineLayer, PolygonLayer } from '@antv/l7';
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

  constructor({ name, geodata, options }: IGridLayerProps) {
    super();
    this.name = name;
    this.geodata = geodata;
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
    // this.source = new Source(this.geodata);
  }
  getLegendItem() {
    // @ts-ignore
    const scale =
      // @ts-ignore
      this.getLayer(this.name)?.styleAttributeService?.getLayerAttributeScale(
        'color',
      );
    let legend = [];
    if (scale.domain) {
      legend = scale
        .domain()
        .filter((item: any) => item !== 'label')
        .map((item: string | number) => {
          return {
            // @ts-ignore
            label: item || this.options.fill.unkownName || '无',
            color: scale(item),
          };
        });
    }
    return legend;
  }
  addFillLayer() {
    const fillLayer = new PolygonLayer({
      autoFit: false,
      name: this.name,
    })
      .source(this.source)
      .shape('fill')
      .color(this.options.fill!.field, this.options.fill?.color)
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
    fillLayer.on('unmousemove', this.hoverHandler.bind(this));
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
      .source(this.geodata)
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
      .color('#000')
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
    this.geodata.features = this.geodata.features.map((item: any) => {
      const { id } = item.properties;
      const newProperties = map[id];
      if (newProperties) {
        Object.assign(item.properties, newProperties);
      }
      return item;
    });
    this.updateSource(this.geodata);
    this.emit(LayerGroupEventEnum.DATAUPDATE);
  }

  clickHandler(e: any) {
    const { target } = e;
    if (target.shiftKey) {
      // 多选
      this.selectFeatures = uniqFeatures(this.selectFeatures, e);
    } else if (
      this.selectFeatures.length === 1 &&
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

  hoverHandler(e: any) {
    this.hoverFeature = e.feature ? e : null;
    this.emit(LayerGroupEventEnum.HOVERFEATURECHANGE, this.hoverFeature);

    this.hoverLayer?.setData({
      type: 'FeatureCollection',
      features: e.feature ? [e.feature] : [],
    });
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
}
