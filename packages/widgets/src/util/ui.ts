import { IWidgetProps } from '@antv/dipper-core';

export const isDisplay = (display?: any) => display !== false;

type Position = 'left' | 'right' | 'center';

// 获取AppContent childrens
export const getAppContentItem = (
  items: IWidgetProps,
  position: Position,
): IWidgetProps[] => {
  return items.childrens?.filter((bar) => bar.position === position) || [];
};

export const findItem = (
  items: IWidgetProps,
  position: Position,
): IWidgetProps | undefined => {
  return items.childrens?.find((bar) => bar.position === position);
};
