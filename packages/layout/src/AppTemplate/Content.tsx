import React, { useMemo, useState } from 'react';
import { isDisplay } from '../utils';
import { CustomControl } from '@antv/l7-react';
import { PositionName } from '@antv/l7';
import { Tabs } from 'antd';
import { getWidget } from '@antv/dipper-core';
import { useWidgets } from '../hooks/useWidgets';
import { useEffect } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import style from './style.less';

const { TabPane } = Tabs;

interface ContentProps {
  items: IWidgetProps<string>[];
}
// 普通组件
export function AppContent({ items }: ContentProps) {
  return (
    <>
      {items
        ?.filter((item: any) => isDisplay(item.display))
        .map((item: any) => {
          return (
            <div key={item.type}>
              {' '}
              {getWidget(item.type)(item)} {/* {useWidgets(item)} */}
            </div>
          );
        })}
    </>
  );
}

// tab组件
export function AppTabsContent({ items }: ContentProps) {
  const [currentOperate, setCurrentOperate] = useState('');
  useEffect(() => {
    if (items.length !== 0) {
      setCurrentOperate(items[0].type + items[0]?.title);
    }
  }, [JSON.stringify(items)]);
  return (
    <Tabs
      activeKey={currentOperate}
      onChange={setCurrentOperate}
      type="card"
      className={style.titleTop}
    >
      {items.map((tab: any) => {
        return (
          <TabPane
            tab={tab?.title}
            key={tab.type + tab?.title}
            className={style.tabPanel}
          >
            {getWidget(tab.type)({ ...tab.options, children: tab.children })}

            {/* {useWidgets(tab)} */}
          </TabPane>
        );
      })}
    </Tabs>
  );
}

// 地图组件
export function AppMapControlContent({ items }: ContentProps) {
  return (
    <>
      {items?.map((l) => {
        return (
          <CustomControl
            position={(l?.position || 'bottomleft') as PositionName}
            key={l.type}
          >
            {getWidget(l.type)(l) as React.ReactElement}
          </CustomControl>
        );
      })}
    </>
  );
}
