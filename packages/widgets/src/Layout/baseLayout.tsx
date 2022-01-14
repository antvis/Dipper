import React, { useEffect, useState } from 'react';
import { IWidgetProps, IWidget, getWidget } from '@antv/dipper-core';
import BaseLayout from './base';
import { useWidgetsService } from '../hooks';
import { CustomBaseWidgets } from '../BaseWidget/widget';

interface IWidgetsComponent extends IWidgetProps {
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
}

interface ContentProps {
  items: IWidgetProps[];
}
// 普通组件

export const LayoutContent = ({ items }: ContentProps) => {
  return (
    <React.Fragment>
      {items?.map((w: IWidgetProps<any>) => {
        return <CustomBaseWidgets {...w} />; // TODO 渲染子组件
      })}
    </React.Fragment>
  );
};

export const CustomBaseLayout = (props: IWidgetsComponent) => {
  const { widgetsService } = useWidgetsService();
  const [layout, setLayout] = useState<BaseLayout>();
  useEffect(() => {
    const wid = new BaseLayout(props);
    setLayout(wid);
    widgetsService.addWidget(wid);
    return () => {
      widgetsService.removeWidget(wid.id);
    };
  }, []);

  // TODO 状态更新

  return <LayoutContent items={layout?.getOptions().childrens || []} />;
};
