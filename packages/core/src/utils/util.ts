import { isArray } from 'lodash';
import type { IWidgetProps } from '../services/widgets/IWidgetsService';

export const getWidgetChildren = (items: any): IWidgetProps[] => {
  if (isArray(items.components) && items.components.length !== 0) {
    return items.components;
  } else if (items.children && isArray(items.children)) {
    return items.children as IWidgetProps[];
  } else {
    return [];
  }
};
export const isDisplay = (display?: any) => display !== false;
