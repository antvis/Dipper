import React, { useEffect, useState } from 'react';
import { IWidgetProps, IWidget } from '@antv/dipper-core';
import BaseWidget from '.';
import { useWidgetsService } from '@antv/dipper-layout';

interface IWidgetsComponent extends IWidgetProps {
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
}

export const CustomBaseWidgets = (props: IWidgetsComponent) => {
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

  return (widget && props?.children) || '';
};
