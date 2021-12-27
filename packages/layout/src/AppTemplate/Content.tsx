import React, { useMemo, useState } from 'react';
import { isDisplay } from '../utils';
import { CustomControl } from '@antv/l7-react';
import { PositionName } from '@antv/l7';
import { Tabs } from 'antd';
import { isEqual } from 'lodash';
import Widgets from '../Widgets';
import { useEffect } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import style from './style.less';

const { TabPane } = Tabs;

interface ContentProps {
  items: IWidgetProps[];
}
// 普通组件
function Content({ items }: ContentProps) {
  return (
    <>
      {items
        ?.filter((item: any) => isDisplay(item.display))
        .map((item: IWidgetProps) => {
          return <Widgets item={item} key={item.type} />;
        })}
    </>
  );
}
export const AppContent = React.memo(Content, isEqual);

// tab组件
function appTabsContent({ items }: ContentProps) {
  const [currentOperate, setCurrentOperate] = useState('');
  useEffect(() => {
    if (items.length !== 0) {
      setCurrentOperate(items[0].type + items[0]?.title);
    }
  }, [JSON.stringify(items)]);

  const displayItems = useMemo(
    () => items.filter((item) => isDisplay(item.display)),
    [items],
  );

  return displayItems.length > 1 ? (
    <Tabs
      activeKey={currentOperate}
      onChange={setCurrentOperate}
      type="card"
      className={style.titleTop}
    >
      {displayItems.map((tab: any) => {
        return (
          <TabPane
            tab={tab?.title}
            key={tab.type + tab?.title}
            className={style.tabPanel}
          >
            <Widgets item={tab} />
          </TabPane>
        );
      })}
    </Tabs>
  ) : (
    <Widgets item={displayItems[0]} />
  );
}
export const AppTabsContent = React.memo(appTabsContent, isEqual);

// 地图组件
function appMapControlContent({ items }: ContentProps) {
  return (
    <>
      {items?.map((l) => {
        return (
          <CustomControl
            position={(l?.position || 'bottomleft') as PositionName}
            key={l.type}
          >
            <Widgets item={l} />
          </CustomControl>
        );
      })}
    </>
  );
}

export const AppMapControlContent = React.memo(appMapControlContent, isEqual);
