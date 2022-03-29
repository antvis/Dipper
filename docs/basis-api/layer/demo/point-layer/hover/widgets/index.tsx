import { registerWidget } from '@antv/dipper-core';
import PointLayer from './PointLayer';
import MyPanel from './MyPanel';

export function initWidgets() {
  registerWidget('hoverPointLayer', PointLayer);
  registerWidget('myPanel', MyPanel);
}
