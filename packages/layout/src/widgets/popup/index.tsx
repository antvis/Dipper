import type { IWidgetProps } from '@antv/dipper-core';
import { useWidget } from '@antv/dipper-layout';
import type { IPopupOption } from '@antv/l7';
import { Popup } from '@antv/l7-react';
import React from 'react';

export function DipperPopup(props: IWidgetProps<IPopupOption>) {
  const { widgetOptions } = useWidget('popup');
  const options = widgetOptions?.options as any;
  return widgetOptions?.display && options.lngLat ? (
    <Popup lnglat={options.lngLat} option={options}>
      {options.children}
    </Popup>
  ) : (
    <></>
  );
}
