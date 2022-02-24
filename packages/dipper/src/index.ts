export * from '@antv/dipper-core';
export * from '@antv/dipper-layout-pc';
export * from '@antv/dipper-layout-base';
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
  Map2Image,
  DipperCollapse,
  DipperSelect,
} from '@antv/dipper-widgets';
registerWidget('cityselect', CitySelect);
registerWidget('select', DipperSelect);
registerWidget('panelTabContent', PanelTabcontent);
registerWidget('navibar', NavBar);
registerWidget('classifyColor', ClassifyColor);
registerWidget('discreteColor', DiscreteColor);
registerWidget('multiClassifyColor', MultiClassifyColor);
registerWidget('mapStyle', MapStyle);
registerWidget('location', Location);
registerWidget('searchPlaces', SearchPlace);
registerWidget('exportMap', Map2Image);
registerWidget('collapse', DipperCollapse);
