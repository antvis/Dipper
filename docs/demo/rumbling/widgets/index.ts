import { registerWidget } from '@antv/dipper-core';
import {
  CitySelect,
  SiderBar,
  NavBar,
  ClassifyColor,
} from '@antv/dipper-widgets';
import { GridLayer } from './GridLayer';
import { FunnelFilter } from './FunnelFilter';
import { MapStyle } from '@antv/dipper-widgets';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('siderbartabcontent', SiderBar);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifycolor', ClassifyColor);
  registerWidget('funnelFilter', FunnelFilter);
  registerWidget('mapStyle', MapStyle);
}
