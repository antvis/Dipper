import React from 'react';
import styles from './index.less';
import { IWidgetProps, getWidgetChildren } from '@antv/dipper-core';
import { isDisplay, LayoutContent, useConfigService } from '@antv/dipper-layout-base';

export function MobileMapToolbar() {
  const { globalConfig } = useConfigService();
  const { toolbar } = globalConfig;

  // TODO 根据配置
  return (
    <>
      {toolbar?.map((i, index) =>
        isDisplay(i?.display) ? (
          <div className={styles.appToolbar} key={index}>
            <LayoutContent items={getWidgetChildren(i as IWidgetProps)} />
          </div>
        ) : null,
      )}
    </>
  );
}
