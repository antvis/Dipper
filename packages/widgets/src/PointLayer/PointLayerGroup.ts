import { PointLayer, Source } from '@antv/l7';
import type { ILayerGroup } from '@antv/dipper-core';
import { LayerGroup } from '@antv/dipper-core';

import type { IPointLayerProps, ILayerGroupOption } from './common';

export type IPointLayerGroup = ILayerGroup & {
  getLegendItem: () => any;
  updateProperties: (props: Record<string, any>[]) => any;
};

export class PointLayerGroup extends LayerGroup implements ILayerGroup {
  private options: Partial<ILayerGroupOption> = {};

  constructor({ name, data }: Omit<IPointLayerProps, 'options'>) {
    super();
    this.name = name;
    this.data = data;
  }

  public init() {
    this.initSource();
    this.addFillLayer();
  }

  initSource() {
    this.source = new Source(this.data);
  }

  addFillLayer() {
    const pointLayer = new PointLayer({
      autoFit: false,
      name: this.name,
    })
      .source(this.source)
      .size(10)
      .shape('circle')
      .color('rgba(105,196,142,0.65)')
      .style({
        stroke: '#ffffff',
        strokeWidth: 1,
      });

    super.addLayer(pointLayer);
  }

  resetActive() {
    // this.clickLayer?.setData({
    //   type: 'FeatureCollection',
    //   features: [],
    // });
  }
}
