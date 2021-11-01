import { registerWidget } from '@antv/dipper-core';
import { AppFilter } from './Filter';
import { NavBar } from './NavBar';
import { GridLayer } from './GridLayer';
import { ClassifyColor } from './Classifycolor';
import { FunnelFilter } from './FunnelFilter';

export function initWidgets() {
  registerWidget('cityselect', AppFilter);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifycolor', ClassifyColor);
  registerWidget('funnelFilter', FunnelFilter);
}
