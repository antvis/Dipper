export * from '@antv/dipper-core';
export * from '@antv/dipper-layout';
export * from '@antv/dipper-widgets';
import { registerWidget } from '@antv/dipper-core';
import {
  CitySelect,
  PanelTabcontent,
  NavBar,
  ClassifyColor,
  DiscreteColor,
  MultiClassifyColor,
  Location,
  SearchPlace,
  MapStyle,
} from '@antv/dipper-widgets';

registerWidget('citySelect', CitySelect);
registerWidget('panelTabContent', PanelTabcontent);
registerWidget('navibar', NavBar);
registerWidget('classifyColor', ClassifyColor);
registerWidget('discreteColor', DiscreteColor);
registerWidget('multiClassifyColor', MultiClassifyColor);
registerWidget('mapStyle', MapStyle);
registerWidget('location', Location);
registerWidget('searchPlaces', SearchPlace);
