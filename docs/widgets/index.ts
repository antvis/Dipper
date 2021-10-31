import { registerWidget } from '@antv/dipper-core';
import { AppFilter } from './Filter';
import { NavBar } from './NavBar';
import { GridLayer } from './GridLayer'


export function initWidgets() {
  registerWidget('cityselect', AppFilter);
  registerWidget('navibar',NavBar)
  registerWidget('gridLayer',GridLayer)
}
