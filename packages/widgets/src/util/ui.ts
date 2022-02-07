import { IWidgetProps, getWidgetChildren } from '@antv/dipper-core';

export const isDisplay = (display?: any) => display !== false;

type Position = 'left' | 'right' | 'center';

// 获取AppContent children
export const getAppContentItem = (
  items: IWidgetProps,
  position: Position,
): IWidgetProps[] => {
  return (
    getWidgetChildren(items).filter((bar) => bar.position === position) || []
  );
};

export const findItem = (
  items: IWidgetProps,
  position: Position,
): IWidgetProps | undefined => {
  return getWidgetChildren(items).find((bar) => bar.position === position);
};
