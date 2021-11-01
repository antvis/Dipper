import React from 'react';
import styles from './index.less';
import { useConfigService } from '../hooks';
import { AppContent } from '../AppTemplate';
import { getAppContentItem, isDisplay } from '../utils/ui';

export default function AppToolbar() {
  const { globalConfig } = useConfigService();
  const { toolbar } = globalConfig;

  // TODO 根据配置
  return isDisplay(toolbar?.display) ? (
    <div className={styles.appToolbar}>
      {/* 左侧组件 */}
      <div>
        <AppContent items={getAppContentItem(toolbar, 'left')} />
      </div>
      {/* 右侧组件 */}
      <div>
        <AppContent items={getAppContentItem(toolbar, 'right')} />
      </div>
    </div>
  ) : (
    <></>
  );
}
