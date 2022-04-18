import React, { useMemo } from 'react';
import type { IControlWidgetsProps } from '@antv/dipper-core';
import { isDisplay } from '@antv/dipper-core';
import { BaseControl } from '@antv/dipper-layout';

import { groupBy } from 'lodash';
export default function MapControls({ controls }: { controls: IControlWidgetsProps[] }) {
  const controlGroupBy = useMemo(() => {
    return groupBy(
      controls?.filter((item: any) => isDisplay(item.display)),
      (c) => {
        const defaultLayout = (c.position || 'topleft') === 'topleft' ? 'horizontal' : 'vertical';
        return [c.position || 'topleft', c.layout || defaultLayout].join('-');
      },
    );
  }, [controls]);

  return <BaseControl controlGroupBy={controlGroupBy} />;
}
