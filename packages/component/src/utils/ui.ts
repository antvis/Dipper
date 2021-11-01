import { IWidgetProps, IConfig } from '@antv/dipper-core';

export const isDisplay = (display?: any) => display !== false;

type Position = 'left' | 'right' | 'center';

type Child<T> = IConfig<T>;

// 获取AppContent children
export const getAppContentItem = (
  child: Child<any>,
  position: Position,
): IWidgetProps[] => {
  return (
    child?.children?.filter(
      (bar: { position: string }) => bar.position === position,
    ) || []
  );
};

export const findItem = (
  child: Child<any>,
  position: Position,
): IWidgetProps => {
  return (
    child?.children?.find(
      (bar: { position: string }) => bar.position === position,
    ) || {}
  );
};
