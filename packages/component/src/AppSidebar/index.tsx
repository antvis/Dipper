import React, { useMemo } from 'react';
import styles from './index.less';
import { isDisplay } from '../utils';
import ToggleButton from './ToggleButton';
import { useConfigService, useSidebarService } from '../hooks';
import { AppContent } from '../AppTemplate';

function getStyle(
  position: string,
  opened: boolean,
  sidebarWidth: string | number,
) {
  const order = position === 'left' || position === 'top' ? -1 : 1;

  if (position === 'bottom' || position === 'top') {
    return {
      width: '100%',
      height: opened ? sidebarWidth : '0px',
      order,
    };
  }
  return {
    order,
    width: !opened ? '0px' : sidebarWidth,
  };
}

export default function AppSidebar<T>() {
  const { globalConfig } = useConfigService<T>();
  const { siderBarService } = useSidebarService();
  const { sidebar } = globalConfig;
  const sidebarWidth = useMemo(() => {
    return sidebar?.width ?? '360px';
  }, [sidebar?.width]);
  return isDisplay(sidebar?.display) ? (
    <div
      style={{
        ...getStyle(
          sidebar?.position || 'right',
          sidebar?.opened || false,
          sidebarWidth,
        ),
        ...sidebar?.style,
      }}
      className={styles.appSidebar}
    >
      {sidebar?.enableToggle && (
        <ToggleButton
          isFold={!!sidebar.opened}
          position={sidebar?.position || 'left'}
          setIsFold={() => {
            siderBarService.toggleOpen();
            // setConfig('sidebar', {
            //   open: !sidebar.opened,
            // })
          }}
        />
      )}

      {/* 面板内容 */}
      <AppContent items={sidebar?.children || []} />
    </div>
  ) : (
    <></>
  );
}
