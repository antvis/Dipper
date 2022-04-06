import React, { ReactElement, useMemo } from 'react';
import type { IControlWidgetsProps } from '@antv/dipper-core';
import { isDisplay, IWidgetProps } from '@antv/dipper-core';
import { CustomControl } from '@antv/l7-react';
import type { IControlOption, PositionName } from '@antv/l7';
import { CustomBaseWidgets, BaseControl } from '@antv/dipper-layout';

import { groupBy } from 'lodash';
const DefaultControl = ['zoom', 'scale', 'layer'];
type IControlProps = 'zoom' | 'scale' | 'layer';
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
