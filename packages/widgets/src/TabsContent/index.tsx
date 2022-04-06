import React, { useState, useMemo, useEffect } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import { isDisplay, getWidgetChildren } from '@antv/dipper-core';
import { Tabs } from 'antd';
import classNames from 'classnames';
import style from './index.less';
import { CustomBaseLayout } from '@antv/dipper-layout';
const { TabPane } = Tabs;

interface ContentProps {
  items: IWidgetProps[];
  onChange: (value: string) => void;
}

export function AppTabsContent({ items, onChange }: ContentProps) {
  const [currentOperate, setCurrentOperate] = useState('');

  const displayItems = useMemo(() => items.filter((item) => isDisplay(item.display)), [items]);

  useEffect(() => {
    if (items.length !== 0) {
      setCurrentOperate(items[0].type); // TODO 去掉了Title
    }
  }, [JSON.stringify(displayItems)]);

  useEffect(() => {
    onChange(currentOperate);
  }, [currentOperate]);

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
