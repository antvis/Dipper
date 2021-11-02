import { IWidgetProps, IConfig } from '@antv/dipper-core';

export const isDisplay = (display?: any) => display !== false;

type Position = 'left' | 'right' | 'center';

// 获取AppContent children
export const getAppContentItem = (
  items: IWidgetProps<any>,
  position: Position,
): IWidgetProps<any>[] => {
  return items.children?.filter((bar) => bar.position === position) || [];
};

export const findItem = (
  items: IWidgetProps<any>,
  position: Position,
): IWidgetProps<any> | undefined => {
  return items.children?.find((bar) => bar.position === position);
};
