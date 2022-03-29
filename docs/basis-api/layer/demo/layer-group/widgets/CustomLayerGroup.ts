import { LayerGroup, ILayerGroupOptions } from '@antv/dipper';
import { cloneDeep } from 'lodash';
import { PointLayer } from '@antv/l7';
import { featureCollection } from '@turf/turf';

/**
 * 当前CustomLayerGroup构造器参数options的类型定义
 */
export interface ICustomLayerOptions extends ILayerGroupOptions {
  color: string;
  size: number;
}

/**
 * 当前CustomLayerGroup构造器参数options的默认值
 */
export const defaultCustomLayerOptions = {
  color: '#ff0000',
  size: 10,
};

/**
 * 以下两个实现方法在LayerGroup定义为抽象类，所有集成LayerGroup的子类都需要手动这两个方法的具体实现
 */
export default class CustomLayerGroup extends LayerGroup<ICustomLayerOptions> {
  /**
   * CustomLayerGroup的默认配置，在父类LayerGroup的构造器中与用于传入的options进行深合并
   */
  getDefaultOptions(): ICustomLayerOptions {
    return cloneDeep(defaultCustomLayerOptions);
  }

  /**
   *
   */
  initLayerList() {
    const { color, size } = this.options;
    const pointLayer = new PointLayer({
      autoFit: true,
    });
    pointLayer
      .source(featureCollection([]))
      .shape('circle')
      .color(color)
      .size(size);

    this.addLayer(pointLayer);
  }
}
