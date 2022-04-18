import React, { useMemo } from 'react';
import { useConfigService, BaseControl } from '@antv/dipper-layout';
import { groupBy } from 'lodash';
import { isDisplay } from '@antv/dipper-core';

export default function MapControl() {
  const { globalConfig } = useConfigService();
  const { controls, panel } = globalConfig;
  const controlGroupBy = useMemo(() => {
    if (panel && panel.display) {
      //底部sidebar 存在时
      return groupBy(
        controls?.filter(
          (item) =>
            (isDisplay(item.display) && !['bottomleft', 'bottomright'].includes(item.position!)) ||
            ['zoom', 'scale', 'layers'].indexOf(item.type) !== -1,
        ),
        (c) => {
          const defaultLayout = c.position === 'topleft' ? 'horizontal' : 'vertical';
          return [c.position, c.layout || defaultLayout].join('-');
        },
      );
    }

    return groupBy(
      //底部sidebar 不存在时
      controls?.filter((item) => isDisplay(item.display)),
      (c) => {
        const defaultLayout = c.position === 'topleft' ? 'horizontal' : 'vertical';
        return [c.position, c.layout || defaultLayout].join('-');
      },
    );
  }, [controls, panel]);

  return <BaseControl controlGroupBy={controlGroupBy} />;
}
