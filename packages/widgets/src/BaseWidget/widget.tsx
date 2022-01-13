import React, { useEffect, useRef, FC } from 'react';
import { IWidgetProps } from '@antv/dipper-core';
import BaseWidget from '.';
import { useWidgetsService } from '../Layout/hooks';

export const CustomBaseWidgets: FC<IWidgetProps> = (props) => {
  const { widgetsService } = useWidgetsService();
  const { display } = props;
  const id = useRef('');
  useEffect(() => {
    if (!display) {
      widgetsService.removeWidget(id.current);
      id.current = '';
      return;
    }

    if (id.current) {
      return;
    }

    const wid = new BaseWidget(props);
    id.current = wid.id;
    widgetsService.addWidget(wid);
    return () => {
      widgetsService.removeWidget(wid.id);
    };
  }, [display]);

  // TODO 状态更新
  return <>{(display && props.children) || null}</>;
};
