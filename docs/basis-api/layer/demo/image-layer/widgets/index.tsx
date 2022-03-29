import { registerWidget } from '@antv/dipper-core';
import ImageLayer from './ImageLayer';

export function initWidgets() {
  registerWidget('imageLayer', ImageLayer);
}
