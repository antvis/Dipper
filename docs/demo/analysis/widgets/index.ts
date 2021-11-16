import { registerWidget } from '@antv/dipper-core';
import {
  CitySelect,
  SiderBar,
  NavBar,
  ClassifyColor,
  DiscreteColor,
  Draw,
  MapStyle,
  SearchPlace,
  Location
} from '@antv/dipper-widgets';
import { Activity } from './Activity';
import { GridLayer } from './GridLayer';
import { MapExhibit } from './MapExhibit';
import { MeshIndicator } from './MeshIndicator';
import { Save } from './Save';
import { Send } from './Send';
import { Status } from './Status';
import { MeshName } from './MeshName';
import { Filter } from './Filter';
import { TotalPanel } from './TotalPanel/index';
import { MeshChart } from './MeshChart';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('siderbartabcontent', SiderBar);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifyColor', ClassifyColor);
  registerWidget('discreteColor', DiscreteColor);
  registerWidget('mapStyle', MapStyle);
  registerWidget('searchPlaces', SearchPlace);
  registerWidget('location', Location);
  registerWidget('filter',Filter)
  registerWidget('mesh_indicator', MeshIndicator);
  registerWidget('total_data_panel', TotalPanel);
  registerWidget('meshchart',MeshChart)

  registerWidget('draw', Draw);
  registerWidget('save', Save);
  registerWidget('publishbar', Send);
  registerWidget('activity', Activity);
  registerWidget('status',Status);
  registerWidget('mapExhibit', MapExhibit);
  registerWidget('meshName',MeshName)
}
