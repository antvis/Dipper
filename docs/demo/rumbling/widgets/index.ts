import { registerWidget } from '@antv/dipper-core';
import {
  CitySelect,
  SiderBar,
  NavBar,
  ClassifyColor,
  MapStyle,
  DiscreteColor,
  Location,
} from '@antv/dipper-widgets';
import { GridLayer } from './GridLayer';
import { FunnelFilter } from './FunnelFilter';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('siderbartabcontent', SiderBar);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifycolor', ClassifyColor);
  registerWidget('discretecolor',DiscreteColor)
  registerWidget('funnelFilter', FunnelFilter);
  registerWidget('mapStyle', MapStyle);
  registerWidget('location', Location);
}
