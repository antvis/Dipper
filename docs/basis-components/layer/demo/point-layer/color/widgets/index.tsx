import { registerWidget } from '@antv/dipper-core';
import PointLayer from './PointLayer';

export function initWidgets() {
  registerWidget('colorPointLayer', PointLayer);
}
