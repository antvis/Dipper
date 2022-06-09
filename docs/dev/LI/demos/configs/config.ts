import type { IConfig } from '@antv/dipper';
import hangezhouGeoJSON from './xihu-district.json';

export const config: Partial<IConfig> = {
  panel: {
    display: true,
    options: {
      enableToggle: true,
      defaultTitle: '所有网格',
      opened: false,
      width: 426,
    },
    position: 'right',
    children: [],
  },
  controls: [
    {
      type: 'zoom',
      position: 'bottomright',
      display: false,
    },
    {
      type: 'scale',
      position: 'bottomleft',
      display: false,
    },
    {
      display: true,
      position: 'topleft',
      type: 'location',
      // layout:'horizontal',
      title: '定位',
    },
    {
      display: true,
      position: 'topleft',
      type: 'mapStyle',
      // layout:'horizontal',
      title: '地图样式',
    },
  ],
  mapType: 'GaodeV1',
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
  layers: [
    {
      type: 'ChoroplethLayer',
      options: {},
      source: { data: hangezhouGeoJSON, parser: { type: 'geojson' } },
      fillColor: 'rgb(239,243,255)',
      opacity: 0.3,
      lineOpacity: 1,
      strokeColor: 'blue',
    },
  ],
};
