import React, { useEffect, useState, useMemo } from 'react';
import { IWidgetProps, getWidgetChildren } from '@antv/dipper-core';
import classNames from 'classnames';
import { Tabs } from 'antd';
import style from './index.less';
import { isDisplay, CustomBaseLayout } from '@antv/dipper-layout-base';
const { TabPane } = Tabs;

interface ContentProps {
  items: IWidgetProps[];
}

export function AppTabsContent({ items }: ContentProps) {
  const [currentOperate, setCurrentOperate] = useState('');

  const displayItems = useMemo(() => items.filter((item) => isDisplay(item.display)), [items]);

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
          <TabPane tab={tab?.options?.title} key={tab.type} className={style.tabPanel}>
            <CustomBaseLayout type={tab.type} components={getWidgetChildren(tab)} />
          </TabPane>
        );
      })}
    </Tabs>
  );
}
