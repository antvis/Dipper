import React from 'react';
import { IFeature, LayerGroup, LayerGroupEventEnum } from '@antv/dipper-core';
import { Marker, ILngLat } from '@antv/l7';
import ReactDOM from 'react-dom';
import { point } from '@turf/turf';
import { FunctionComponentElement, ReactPortal } from 'react';

export interface IMarkerItemProps<T = any> {
  data: T;
  index: number;
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

  markerList: Marker[] = [];

  get selectFeature(): IFeature | null {
    return this.selectFeatures[0] ?? null;
  }

  getDefaultOptions() {
    return {
      component: EmptyMarkerItem,
      lngField: 'lng',
      latField: 'lat',
    };
  }

  initLayerList() {}

  setData(data: T[]): FunctionComponentElement<{}> {
    this.data = data;
    this.setSelectFeatures([]);
    this.setHoverFeature(null);
    // 重置选中数据
    this.emit(LayerGroupEventEnum.DATA_UPDATE, data);
    return this.updateMarkers();
  }

  updateMarkers() {
    this.autoFillMarkerList();
    const portalList: ReactPortal[] = [];
    const Component = this.options.component;
    for (let index = 0; index < this.data.length; index++) {
      const item = this.data[index];
      const el = document.createElement('div');
      this.initMarkerEvent(el, item, index);
      portalList.push(ReactDOM.createPortal(<Component data={item} index={index} />, el));
      const marker = this.markerList[index] as Marker;
      marker.setElement(el).setLnglat(this.getMarkerLngLat(item));
    }
    return React.createElement(React.Fragment, {}, portalList);
  }

  initMarkerEvent(el: HTMLElement, item: T, index: number) {
    el.addEventListener('click', (e) => {
      if (this.selectFeature?.featureId === index) {
        this.setSelectFeatures([]);
      } else {
        this.setSelectFeatures([this.newIFeature(e, item, index)]);
      }
    });
  }

  newIFeature(e: MouseEvent, item: T, index: number) {
    const { lng, lat } = this.getMarkerLngLat(item);
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

  getMarkerLngLat(item: T) {
    // @ts-ignore
    const lng = +item[this.options.lngField] as any;
    // @ts-ignore
    const lat = +item[this.options.latField] as any;

    if (Math.abs(lng) <= 180 && Math.abs(lat) <= 90) {
      return {
        lng,
        lat,
      } as ILngLat;
    } else {
      throw new Error('数据的经纬度信息有误');
    }
  }

  /**
   * 自动填充markerList直至data的长度
   */
  autoFillMarkerList() {
    const length = this.data.length - this.markerList.length;
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        // TODO 增加偏移量
        const marker = new Marker().setLnglat({
          lng: 0,
          lat: 0,
        });
        this.markerList.push(marker);
        this.scene?.addMarker(marker);
      }
    }
  }
}
