import React, { useEffect, useState } from 'react';
import { IWidgetProps, IWidget, getWidget } from '@antv/dipper-core';
import BaseWidget from '.';
import { useWidgetsService } from '../hooks';

export const CustomBaseWidgets = (props: IWidgetProps) => {
  const { widgetsService } = useWidgetsService();
  const [widget, setWidgets] = useState<IWidget>();
  useEffect(() => {
    const wid = new BaseWidget(props);
    setWidgets(wid);
    widgetsService.addWidget(wid);
    return () => {
      widgetsService.removeWidget(wid.id);
    };
  }, []);

  // TODO 状态更新

  return <React.Fragment>{getWidget(props.type)(props)}</React.Fragment>;
};
