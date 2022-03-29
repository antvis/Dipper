import React, { useEffect, useState, useMemo, useRef } from 'react';
import { IWidgetProps, getWidgetChildren, isDisplay } from '@antv/dipper-core';
import { PositionName } from '@antv/l7';
import { CustomControl } from '@antv/l7-react';
import BaseLayout from './Base';
import { useWidgetsService } from '../hooks';
import { CustomBaseWidgets } from '../BaseWidget';

interface ContentProps {
  items: IWidgetProps[];
}
// 普通组件

export const LayoutContent = ({ items }: ContentProps) => {
  return (
    <React.Fragment>
      {/* 过滤掉display false 的组件 */}
      {items
        ?.filter((ctr) => isDisplay(ctr.display))
        .map((w: IWidgetProps<any>, index: number) => {
          return <CustomBaseWidgets key={w.type + index} {...w} />; // TODO 渲染子组件
        })}
    </React.Fragment>
  );
};

export const AppMapControlContent = ({ items }: ContentProps) => {
  return (
    <>
      {items?.map((l) => {
        return (
          <CustomControl position={(l?.position || 'bottomleft') as PositionName} key={l.type}>
            <CustomBaseWidgets {...l} />
          </CustomControl>
        );
      })}
    </>
  );
};

export const CustomBaseLayout = (props: IWidgetProps) => {
  const { widgetsService } = useWidgetsService();
  const layout = useRef<BaseLayout>();
  useEffect(() => {
    layout.current = new BaseLayout(props);
    widgetsService.addWidget(layout.current);
    return () => {
      widgetsService.removeWidget(layout.current!.id);
    };
  }, []);

  // TODO 状态更新

  return <LayoutContent items={getWidgetChildren(props)} />;
};
