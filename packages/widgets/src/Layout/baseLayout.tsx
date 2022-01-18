import React, { useEffect, useState, useMemo, useRef } from 'react';
import { IWidgetProps } from '@antv/dipper-core';
import { PositionName } from '@antv/l7';
import { CustomControl } from '@antv/l7-react';
import classNames from 'classnames';
import BaseLayout from './base';
import { useWidgetsService } from '../hooks';
import { CustomBaseWidgets } from '../BaseWidget/widget';
import { isDisplay } from '../util/ui';
import { Tabs } from 'antd';
import style from './style.less';
const { TabPane } = Tabs;
interface IWidgetsComponent extends IWidgetProps {
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
}

interface ContentProps {
  items: IWidgetProps[];
}
// 普通组件

export const LayoutContent = ({ items }: ContentProps) => {
  return (
    <>
      {items?.map((w: IWidgetProps<any>, index: number) => {
        return <CustomBaseWidgets key={w.type + index} {...w} />; // TODO 渲染子组件
      })}
    </>
  );
};

export function AppTabsContent({ items }: ContentProps) {
  const [currentOperate, setCurrentOperate] = useState('');

  const displayItems = useMemo(
    () => items.filter((item) => isDisplay(item.display)),
    [items],
  );

  useEffect(() => {
    if (items.length !== 0) {
      setCurrentOperate(items[0].type); // TODO 去掉了Title
    }
  }, [JSON.stringify(displayItems)]);

  return (
    <Tabs
      key="tab"
      activeKey={currentOperate}
      onChange={setCurrentOperate}
      type="card"
      className={classNames({
        [style.titleTop]: true,
        [style.hideTop]: displayItems.length <= 1,
      })}
    >
      {displayItems.map((tab: IWidgetProps) => {
        return (
          <TabPane
            tab={tab?.options?.title}
            key={tab.type}
            className={style.tabPanel}
          >
            <CustomBaseWidgets {...tab} />
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export const AppMapControlContent = ({ items }: ContentProps) => {
  return (
    <>
      {items?.map((l) => {
        return (
          <CustomControl
            position={(l?.position || 'bottomleft') as PositionName}
            key={l.type}
          >
            <CustomBaseWidgets {...l} />
          </CustomControl>
        );
      })}
    </>
  );
};

export const CustomBaseLayout = (props: IWidgetsComponent) => {
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

  return <LayoutContent items={props.childrens || []} />;
};
