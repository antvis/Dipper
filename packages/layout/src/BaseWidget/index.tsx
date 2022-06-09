import type { IWidget, IWidgetProps } from '@antv/dipper-core';
import { BaseWidget, getWidget } from '@antv/dipper-core';
import React, { useEffect, useRef } from 'react';
import { useWidgetsService } from '../hooks';

export const CustomBaseWidgets = (props: IWidgetProps) => {
  const { widgetsService } = useWidgetsService();
  const widget = useRef<IWidget>();

  if (!widget.current) {
    widget.current = new BaseWidget(props);
    widgetsService.addWidget(widget.current);
  }

  useEffect(() => {
    return () => {
      widgetsService.removeWidget(widget.current!.id);
    };
  }, []);

  const Components = getWidget(props.type);
  const componentsProps = widget.current.getOptions();

  return <Components {...componentsProps} widget={widget.current} />;
};
