import { registerWidget } from '@antv/dipper-core';
import Layer from './Layer';

export function initWidgets() {
  registerWidget('layer', Layer);
}
