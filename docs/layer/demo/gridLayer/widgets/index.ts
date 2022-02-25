import { registerWidget } from '@antv/dipper-core';
import GridLayer from './GridLayer';

export function initWidgets() {
  registerWidget('gridLayer', GridLayer);
}
