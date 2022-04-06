import React from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import { getWidget } from '@antv/dipper-core';
import { isEqual } from 'lodash';
const Widgets = ({ item }: { item: IWidgetProps }) => {
  return <>{getWidget(item.type)(item)}</>;
};
export default React.memo(Widgets, isEqual);
