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
  Location,
} from '@antv/dipper-widgets';
import { Activity } from '../../task/widgets/Activity';
import { GridLayer } from './GridLayer';
import { MapExhibit } from '../../task/widgets/MapExhibit';
import { MeshIndicator } from './MeshIndicator';
import { Save } from '../../task/widgets/Save';
import { Send } from '../../task/widgets/Send';
import { Status } from '../../task/widgets/Status';
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
  registerWidget('filter', Filter);
  registerWidget('mesh_indicator', MeshIndicator);
  registerWidget('total_data_panel', TotalPanel);
  registerWidget('meshchart', MeshChart);

  registerWidget('draw', Draw);
  registerWidget('meshName', MeshName);
}
