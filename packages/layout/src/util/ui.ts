import type { IWidgetProps } from '@antv/dipper-core';
import { getWidgetChildren } from '@antv/dipper-core';

type Position = 'left' | 'right' | 'center';

// 获取AppContent children
export const getAppContentItem = (items: IWidgetProps, position: Position): IWidgetProps[] => {
  return getWidgetChildren(items)?.filter((bar) => bar.position === position) || [];
};

export const findItem = (items: IWidgetProps, position: Position): IWidgetProps | undefined => {
  return getWidgetChildren(items).find((bar) => bar.position === position);
};
