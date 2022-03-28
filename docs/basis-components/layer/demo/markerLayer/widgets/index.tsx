import { registerWidget } from '@antv/dipper-core';
import MarkerLayer from './MarkerLayer';

export function initWidgets() {
  registerWidget('markerLayer', MarkerLayer);
}
