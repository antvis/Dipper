import React from 'react';
import styles from './index.less';
import { LayoutContent, getAppContentItem } from '@antv/dipper-layout';
import type { IWidgetProps, IToolBar } from '@antv/dipper-core';
import { isDisplay } from '@antv/dipper-core';

export default function MapToolbar({ toolbars }: { toolbars: IToolBar[] | IToolBar }) {
  const bars = Array.isArray(toolbars) ? toolbars : [toolbars];

  // TODO 根据配置
  return (
    <>
      {bars?.map((i, index) =>
        isDisplay(i?.display) ? (
          <div className={styles.appToolbar} key={index}>
            {/* 左侧组件 */}
            <div style={{ display: 'flex' }}>
              <LayoutContent items={getAppContentItem(i as IWidgetProps, 'left')} />
            </div>
            {/* 右侧组件 */}
            <div style={{ display: 'flex' }}>
              <LayoutContent items={getAppContentItem(i as IWidgetProps, 'right')} />
            </div>
          </div>
        ) : null,
      )}
    </>
  );
}
