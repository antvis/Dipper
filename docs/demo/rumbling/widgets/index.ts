import { registerWidget } from '@antv/dipper-core';
import { AppFilter } from './Filter';
import { NavBar } from './NavBar';
import { GridLayer } from './GridLayer';
import { Legends } from './Classifycolor';
import { FunnelFilter } from './FunnelFilter';
import { MapStyle } from '@antv/dipper';

export function initWidgets() {
  registerWidget('cityselect', AppFilter);
  registerWidget('navibar', NavBar);
  registerWidget('gridLayer', GridLayer);
  registerWidget('classifycolor',Legends)
  registerWidget('funnelFilter',FunnelFilter)
  registerWidget('mapStyle',MapStyle)
}
