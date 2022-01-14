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
import classNames from 'classnames';
import { CustomBaseWidgets } from '../../BaseWidget/widget';

const { TabPane } = Tabs;

interface ContentProps {
  items: IWidgetProps[];
}
// 普通组件
function Content({ items }: ContentProps) {
  return (
    <>
      {items.map((item: IWidgetProps, idx) => {
        return <Widgets item={item} />;
      })}
    </>
  );
}
export const AppContent = React.memo(Content, isEqual);

// tab组件
function appTabsContent({ items }: ContentProps) {
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
      {displayItems.map((tab: any) => {
        return (
          <TabPane tab={tab?.title} key={tab.type} className={style.tabPanel}>
            <CustomBaseWidgets {...tab}>
              <Widgets item={tab} />
            </CustomBaseWidgets>
          </TabPane>
        );
      })}
    </Tabs>
  );
}
export const AppTabsContent = React.memo(appTabsContent, isEqual);

// 地图组件
function appMapControlContent({ items }: ContentProps) {
  return (
    <>
      {items?.map((item) => {
        return (
          <CustomControl
            position={(item?.position || 'bottomleft') as PositionName}
            key={item.type}
          >
            <CustomBaseWidgets {...item}>
              <Widgets item={item} />
            </CustomBaseWidgets>
          </CustomControl>
        );
      })}
    </>
  );
}

export const AppMapControlContent = React.memo(appMapControlContent, isEqual);
