import { Select } from 'antd';
import React from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import type { IPopupOption } from '@antv/l7';
import { useWidget } from '@antv/dipper-layout';
import { Popup } from '@antv/l7-react';

export function DipperPopup(props: IWidgetProps<IPopupOption>) {
  const { widgetOptions } = useWidget('popup');
  const options = widgetOptions?.options as any;
  return (
    widgetOptions?.display &&
    options.lngLat && (
      <Popup lnglat={options.lngLat} option={options}>
        {options.children}
      </Popup>
    )
  );
}
