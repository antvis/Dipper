import React, { useEffect, useRef, useState } from 'react';
import { IWidgetProps, IWidget, getWidget, BaseWidget } from '@antv/dipper-core';
import { ErrorBoundary } from 'react-error-boundary';

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

  // TODO 状态更新
  const Widget = getWidget(props.type);
  return (
    <ErrorBoundary FallbackComponent={() => <div>error</div>}>
      {
        // @ts-ignore
        Widget ? <Widget {...widget.current.getOptions()} widget={widget.current} /> : null
      }
    </ErrorBoundary>
  );
  // return <>{getWidget(props.type)({ ...widget.current.getOptions(), widget: widget.current })}</>;
};
