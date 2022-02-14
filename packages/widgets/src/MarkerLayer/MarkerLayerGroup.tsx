import React from 'react';
import { IFeature, LayerGroup, LayerGroupEventEnum } from '@antv/dipper-core';
import { MarkerLayer, Marker, ILayer } from '@antv/l7';
import ReactDOM from 'react-dom';
import { point } from '@turf/turf';
import { isEqual } from 'lodash';

export interface IMarkerItemProps<T = any> {
  data: T;
  index: number;
  select: boolean;
}

export interface IMarkerLayerGroupProps<T> {
  component: React.FC<IMarkerItemProps<T>>;
  lngField: string;
  latField: string;
}

const EmptyMarkerItem: React.FC = () => <></>;

export class MarkerLayerGroup<T = any> extends LayerGroup<
  // @ts-ignore
  IMarkerLayerGroupProps<T>
> {
  data: T[] = [];

  get markerLayer() {
    return this.getLayers()[0] as unknown as MarkerLayer;
  }

  getDefaultOptions() {
    return {
      component: EmptyMarkerItem,
      lngField: 'lng',
      latField: 'lat',
    };
  }

  initLayerList() {
    const markerLayer = new MarkerLayer();
    this.addLayer(markerLayer as unknown as ILayer);
  }

  setData(data: T[]) {
    this.data = data;

    this.updateMarkers();

    this.setSelectFeatures([]);
    this.setHoverFeature(null);
    // 重置选中数据
    this.emit(LayerGroupEventEnum.DATA_UPDATE, data);
  }

  async updateMarkers() {
    this.scene?.removeMarkerLayer(this.markerLayer);
    this.markerLayer.clear();
    const Component = this.options.component;
    const selectFeature = this.selectFeatures[0];
    for (let index = 0; index < this.data.length; index++) {
      const item = this.data[index];
      // @ts-ignore
      const lng = +item[this.options.lngField] as any;
      // @ts-ignore
      const lat = +item[this.options.latField] as any;
      const el = document.createElement('div');
      this.initMarkerEvent(el, index);
      await this.renderAsync(
        <Component
          data={item}
          index={index}
          select={isEqual(selectFeature?.feature.properties, item)}
        />,
        el,
      );
      const marker = new Marker({
        element: el,
      }).setLnglat({
        lng,
        lat,
      });

      this.markerLayer.addMarker(marker);
    }
    this.scene?.addMarkerLayer(this.markerLayer);
  }

  initMarkerEvent(el: HTMLElement, index: number) {
    el.addEventListener('click', (e) => {
      if (
        isEqual(this.data[index], this.selectFeatures[0]?.feature.properties)
      ) {
        this.setSelectFeatures([]);
      } else {
        this.setSelectFeatures([this.newIFeature(e, index)]);
      }
      this.updateMarkers();
    });
  }

  newIFeature(e: MouseEvent, index: number) {
    const item = this.data[index];
    // @ts-ignore
    const lng = +item[this.options.lngField] as any;
    // @ts-ignore
    const lat = +item[this.options.latField] as any;
    const pointFeature = point([lng, lat], item);
    const feature: IFeature = {
      feature: pointFeature,
      featureId: index,
      target: e,
      lngLat: {
        lng,
        lat,
      },
    };
    return feature;
  }

  renderAsync(element: any, container: HTMLElement) {
    return new Promise<void>((resolve) => {
      ReactDOM.render(element, container, resolve);
    });
  }
}
