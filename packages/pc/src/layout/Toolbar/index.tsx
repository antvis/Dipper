import type { IToolBar, IWidgetProps } from '@antv/dipper-core';
import { isDisplay } from '@antv/dipper-core';
import { getAppContentItem, LayoutContent } from '@antv/dipper-layout';
import React from 'react';
import styles from './index.less';

export default function MapToolbar({ toolbars }: { toolbars: IToolBar[] | IToolBar }) {
  const bars = Array.isArray(toolbars) ? toolbars : [toolbars];
  const getBarHeight = (i: IToolBar) => {
    return i.options?.height ? `${i.options?.height}px` : '36px';
  };

  // TODO 根据配置
  return (
    <>
      {bars?.map((i, index) =>
        isDisplay(i?.display) ? (
          <div className={styles.appToolbar} style={{ height: getBarHeight(i) }} key={index}>
            {/* 左侧组件 */}
            <div style={{ display: 'flex' }}>
              <LayoutContent items={getAppContentItem(i as IWidgetProps, 'left')} />
            </div>
            {/* 右侧组件 */}
            <div style={{ display: 'flex', height: '36px' }}>
              <LayoutContent items={getAppContentItem(i as IWidgetProps, 'right')} />
            </div>
          </div>
        ) : null,
      )}
    </>
  );
}
