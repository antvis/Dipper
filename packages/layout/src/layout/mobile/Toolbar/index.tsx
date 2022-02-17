import React from 'react';
import styles from './index.less';
import { useConfigService } from '../../../hooks';
import { LayoutContent } from '../../baseLayout';
import { isDisplay } from '../../../util/ui';
import { IWidgetProps, getWidgetChildren } from '@antv/dipper-core';

export default function MapToolbar() {
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
        ) : (
          <></>
        ),
      )}
    </>
  );
}
