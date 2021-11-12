export * from '@antv/dipper-core';
export * from '@antv/dipper-layout';
export * from '@antv/dipper-widgets';
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
} from '@antv/dipper-widgets';

registerWidget('citySelect', CitySelect);
registerWidget('siderbartabcontent', SiderBar);
registerWidget('navibar', NavBar);
registerWidget('classifyColor', ClassifyColor);
registerWidget('discreteColor', DiscreteColor);
registerWidget('mapStyle', MapStyle);
registerWidget('location', Location);
registerWidget('searchPlaces', SearchPlace);
