import React, { useEffect, useRef, useState } from 'react';
import { IWidgetProps, IWidget, getWidget, BaseWidget } from '@antv/dipper-core';

import { useWidgetsService } from '../hooks';

export const CustomBaseWidgets = (props: IWidgetProps) => {
  const { widgetsService } = useWidgetsService();
  const widget = useRef<IWidget>();
  useEffect(() => {
    widget.current = new BaseWidget(props);
    widgetsService.addWidget(widget.current);
    return () => {
      widgetsService.removeWidget(widget.current!.id);
    };
  }, []);

  // TODO 状态更新

  return <>{getWidget(props.type)(props)}</>;
};
