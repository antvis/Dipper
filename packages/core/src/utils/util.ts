import { isArray } from 'lodash';
import { IWidgetProps } from '../services/widgets/IWidgetsService';

export const getWidgetChildren = (items: any): IWidgetProps[] => {
  if (items.components) {
    return items.components;
  } else if (items.children && isArray(items.children)) {
    return items.children as IWidgetProps[];
  } else {
    return [];
  }
};
