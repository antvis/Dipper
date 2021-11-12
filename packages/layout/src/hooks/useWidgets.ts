import { getWidget } from '@antv/dipper-core';
import { useEffect, useMemo } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';

export function useWidgets(item: IWidgetProps<string>) {
  const Widget = useMemo(() => {
    return getWidget(item.type)(item);
  }, [JSON.stringify(item)]);
  return Widget;
}
