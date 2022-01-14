import React, { useRef, useEffect, FC } from 'react';
import { getWidget, IWidgetProps } from '@antv/dipper-core';
import BaseLayout from './BaseLayout';
import { useWidgetsService } from './hooks';
import { CustomBaseWidgets } from '..';

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

  if (props.subChildren && props.subChildren.length) {
    return (
      <>
        {props.subChildren.map((sub, i) => {
          <BaseLayoutComp {...sub} type={sub.type} key={i}>
            {getWidget(sub.type)(sub)}
          </BaseLayoutComp>;
        })}
      </>
    );
  }

  return (
    <CustomBaseWidgets {...props}>
      {getWidget(props.type)(props)}
    </CustomBaseWidgets>
  );
};
