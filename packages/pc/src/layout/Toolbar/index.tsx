import React from 'react';
import styles from './index.less';
import { useConfigService, LayoutContent, getAppContentItem } from '@antv/dipper-layout';
import { IWidgetProps, isDisplay } from '@antv/dipper-core';

export default function MapToolbar() {
  const { globalConfig } = useConfigService();
  const { toolbar } = globalConfig;

  // TODO 根据配置
  return (
    <>
      {toolbar?.map((i, index) =>
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
