import { LayerGroup, TYPES, ILayerService, ILayerGroupOptions } from '@antv/dipper-core';
import { cloneDeep, debounce } from 'lodash';
import { PolygonLayer } from '@antv/l7';
import { isPressing } from '@antv/dipper-core';
import { bbox, bboxPolygon, featureCollection, lineString } from '@turf/turf';

export interface IBoxSelectLayerGroupOptions extends ILayerGroupOptions {
  zIndex: number;
  color: string;
  size: number;
  targets: string[];
}

export const defaultBoxSelectLayerGroupOptions = {
  zIndex: 1,
  color: '#000',
  size: 2,
  targets: [],
};

export interface IBoxPoint {
  lng: number;
  lat: number;
  x: number;
  y: number;
}

export class BoxSelectLayerGroup extends LayerGroup<IBoxSelectLayerGroupOptions> {
  public layer?: PolygonLayer;
  public isDrag: boolean = false;
  public startPoint: IBoxPoint = {
    lng: 0,
    lat: 0,
    x: 0,
    y: 0,
  };
  public endPoint: IBoxPoint = {
    lng: 0,
    lat: 0,
    x: 0,
    y: 0,
  };

  _enable: boolean = false;

  initLayerList() {
    this.layer = this.initBoxLayer();
    this.enable();
  }

  initBoxLayer() {
    const { zIndex, color, size } = this.options;
    const layer = new PolygonLayer({
      zIndex,
    });
    // @ts-ignore
    layer.color(color).size(size).shape('line');
    layer.setSource(this.source);
    this.addLayer(layer);

    return layer;
  }

  updateBoxFeature() {
    const box = bbox(
      lineString([
        [this.startPoint.lng, this.startPoint.lat],
        [this.endPoint.lng, this.endPoint.lat],
      ]),
    );
    this.setData(featureCollection([bboxPolygon(box)]));
  }

  onMouseDown = (e: any) => {
    if (isPressing(16)) {
      this.isDrag = true;
      this.scene?.setMapStatus({
        dragEnable: false,
      });
      const { lng, lat } = e.lnglat;
      this.startPoint = {
        lng,
        lat,
        ...e.pixel,
      };
    }
  };

  onMouseMove = (e: any) => {
    if (this.isDrag) {
      const { lng, lat } = e.lnglat;
      this.endPoint = {
        lng,
        lat,
        ...e.pixel,
      };
      this.updateBoxFeature();
      const layerService = this.container?.get(TYPES.LAYER_SYMBOL) as ILayerService | undefined;

      if (layerService) {
        const { x: startX, y: startY } = this.startPoint;
        const { x: endX, y: endY } = this.endPoint;
        this.options.targets.forEach((layerGroupName) => {
          layerService.getLayer(layerGroupName)?.boxSelect(
            bbox(
              lineString([
                [startX, startY],
                [endX, endY],
              ]),
            ),
          );
        });
      }
    }
  };

  onMouseUp = (e: any) => {
    if (this.isDrag) {
      this.isDrag = false;
      this.scene?.setMapStatus({
        dragEnable: true,
      });
      this.setData(featureCollection([]));
    }
  };

  enable() {
    this._enable = true;
    this.scene?.on('mousedown', this.onMouseDown);
    this.scene?.on('mousemove', this.onMouseMove);
    this.scene?.on('mouseup', this.onMouseUp);
    window.addEventListener('abort', this.onMouseUp);
  }

  disable() {
    this._enable = false;
    this.scene?.off('mousedown', this.onMouseDown);
    this.scene?.off('mousemove', this.onMouseMove);
    this.scene?.off('mouseup', this.onMouseUp);
    window.removeEventListener('abort', this.onMouseUp);
  }

  isEnable() {
    return this._enable;
  }

  getDefaultOptions() {
    return cloneDeep(defaultBoxSelectLayerGroupOptions);
  }
}
