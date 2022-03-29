import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useConfigService, BaseControl, CustomBaseWidgets } from '@antv/dipper-layout';
import { Control, CustomControl } from '@antv/l7-react';
import type { IControlOption, PositionName, Scene } from '@antv/l7';
import { groupBy } from 'lodash';
import { getWidgetChildren, isDisplay } from '@antv/dipper-core';
import { FloatingPanel } from 'antd-mobile';
import styles from './index.less';

const anchors = [100, window.innerHeight * 0.4, window.innerHeight * 0.8];
const THRESHOLD = window.innerHeight * 0.7;

export default function MapControl() {
  const { globalConfig } = useConfigService();
  const { controls, legends = [], defaultcontrols, panel } = globalConfig;
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
