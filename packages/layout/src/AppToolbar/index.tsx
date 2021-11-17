import React from 'react';
import styles from './index.less';
import { useConfigService } from '../hooks';
import { AppContent } from '../AppTemplate';
import { getAppContentItem, isDisplay } from '../utils/ui';
import { IWidgetProps } from '../../../core/dist';

export default function AppToolbar() {
  const { globalConfig } = useConfigService();
  const { toolbar } = globalConfig;

  // TODO 根据配置
  return isDisplay(toolbar?.display) ? (
    <div className={styles.appToolbar}>
      {/* 左侧组件 */}
      <div style={{ display: 'flex' }}>
        <AppContent
          items={getAppContentItem(toolbar as IWidgetProps<any>, 'left')}
        />
      </div>
      {/* 右侧组件 */}
      <div style={{ display: 'flex' }}>
        <AppContent
          items={getAppContentItem(toolbar as IWidgetProps<any>, 'right')}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
