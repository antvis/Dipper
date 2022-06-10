export * from '@antv/dipper-core';
export * from '@antv/dipper-pc';
export * from '@antv/dipper-widgets';

import { registerWidget } from '@antv/dipper-core';
import { DipperPopup } from '@antv/dipper-layout';
import {
  CitySelect,
  ClassifyColor,
  DipperCollapse,
  DipperSelect,
  DiscreteColor,
  Location,
  Map2Image,
  MapStyle,
  MultiClassifyColor,
  NavBar,
  PanelTabcontent,
  SearchPlace,
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
registerWidget('popup', DipperPopup);
