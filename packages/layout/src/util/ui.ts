import { IWidgetProps } from '@antv/dipper-core';

export const isDisplay = (display?: any) => display !== false;

type Position = 'left' | 'right' | 'center';

// 获取AppContent children
export const getAppContentItem = (items: IWidgetProps, position: Position): IWidgetProps[] => {
  return items.subChildren?.filter((bar) => bar.position === position) || [];
};

export const findItem = (items: IWidgetProps, position: Position): IWidgetProps | undefined => {
  return items.subChildren?.find((bar) => bar.position === position);
};
