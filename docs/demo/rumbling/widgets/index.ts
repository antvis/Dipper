import { registerWidget } from '@antv/dipper-core';
import { CitySelect } from '@antv/dipper-widgets';
import { NavBar } from './NavBar';
import { GridLayer } from './GridLayer';
import { ClassifyColor } from './Classifycolor';
import { FunnelFilter } from './FunnelFilter';

export function initWidgets() {
  registerWidget('citySelect', CitySelect);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifycolor', ClassifyColor);
  registerWidget('funnelFilter', FunnelFilter);
}
