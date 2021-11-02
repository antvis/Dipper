import { registerWidget } from '@antv/dipper-core';
import { CitySelect, SiderBar } from '@antv/dipper-widgets';
import { NavBar } from './NavBar';
import { GridLayer } from './GridLayer';
import { Legends } from './Classifycolor';
import { FunnelFilter } from './FunnelFilter';
import { MapStyle } from '@antv/dipper';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('siderbartabcontent', SiderBar);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifycolor', Legends);
  registerWidget('funnelFilter', FunnelFilter);
  registerWidget('mapStyle', MapStyle);
}
