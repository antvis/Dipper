import { registerWidget } from '@antv/dipper-core';
import {
  CitySelect,
  NavBar,
  ClassifyColor,
  DiscreteColor,
  Draw,
  MapStyle,
  SearchPlace,
  Location,
  PropertyTable,
  MeshName
} from '@antv/dipper-widgets';
import { GridLayer } from './GridLayer';
import { MeshIndicator } from './MeshIndicator';
import { Filter } from './Filter';
import { TotalPanel } from './TotalPanel/index';
import { MeshChart } from './MeshChart';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifyColor', ClassifyColor);
  registerWidget('discreteColor', DiscreteColor);
  registerWidget('mapStyle', MapStyle);
  registerWidget('searchPlaces', SearchPlace);
  registerWidget('location', Location);
  registerWidget('filter', Filter);
  registerWidget('mesh_indicator', MeshIndicator);
  registerWidget('total_data_panel', TotalPanel);
  registerWidget('meshchart', MeshChart);
  registerWidget('property_table',PropertyTable)
  registerWidget('meshName', MeshName);

  registerWidget('draw', Draw);
}
