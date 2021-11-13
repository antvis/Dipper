import { registerWidget } from '@antv/dipper-core';
import {
  CitySelect,
  SiderBar,
  NavBar,
  ClassifyColor,
  DiscreteColor,
  Location,
  SearchPlace,
  MapStyle,
  Draw,
} from '@antv/dipper-widgets';
import { GridLayer } from './GridLayer';
import { MeshIndicator } from './MeshIndicator';
import { MeshName } from './MeshName/index';
import { TotalPanel } from './TotalPanel';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('siderbartabcontent', SiderBar);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifyColor', ClassifyColor);
  registerWidget('discreteColor', DiscreteColor);
  registerWidget('mapStyle', MapStyle);
  registerWidget('location', Location);
  registerWidget('searchPlaces', SearchPlace);
  registerWidget('mesh_indicator', MeshIndicator);
  registerWidget('meshName', MeshName),
    registerWidget('total_data_panel', TotalPanel);
  registerWidget('draw', Draw);
}