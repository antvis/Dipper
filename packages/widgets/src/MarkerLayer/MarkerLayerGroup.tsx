import React from 'react';
import { LayerGroup, LayerGroupEventEnum } from '@antv/dipper-core';
import { MarkerLayer, Marker, ILayer } from '@antv/l7';

export interface IMarkerItemProps<T = any> {
  data: T;
  index: number;
  select: boolean;
}

export interface IMarkerLayerGroupProps<T> {
  item: React.FC<IMarkerItemProps<T>> | React.Component<IMarkerItemProps<T>>;
}

const EmptyMarkerItem: React.FC = () => <></>;
export class MarkerLayerGroup<T = any> extends LayerGroup<
  IMarkerLayerGroupProps<T>
> {
  get markerLayer() {
    return this.getLayers()[0] as unknown as MarkerLayer;
  }

  getDefaultOptions() {
    return {
      item: EmptyMarkerItem,
    };
  }

  initLayerList() {
    const markerLayer = new MarkerLayer();
    this.addLayer(markerLayer as unknown as ILayer);
  }

  setData(data: any) {
    this.data = data;

    this.updateMarkers();

    this.setSelectFeatures([]);
    this.setHoverFeature(null);
    // 重置选中数据
    this.emit(LayerGroupEventEnum.DATA_UPDATE, data);
  }

  updateMarkers() {
    this.markerLayer.clear();
  }
}
