import React, { useRef, useEffect, FC } from 'react';
import { IWidgetProps } from '@antv/dipper-core';
import BaseLayout from './BaseLayout';
import { useWidgetsService } from './hooks';

export const BaseLayoutComp: FC<IWidgetProps> = (props) => {
  const container =
    useRef<
      BaseLayout<
        Record<string, any> | Record<string, any>[],
        Record<string, any> | Record<string, any>[]
      >
    >();
  const { widgetsService } = useWidgetsService();

  useEffect(() => {
    if (container.current) {
      return;
    }

    container.current = new BaseLayout(props, widgetsService);
    widgetsService.addWidget(container.current);
    return () => {
      widgetsService.removeWidget(container.current!.id);
      container.current = null!;
    };
  }, []);

  return <>{props.children}</>;
};
