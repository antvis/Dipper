import React, { useMemo } from 'react';
import styles from './index.less';
import { isDisplay } from '../utils';
import ToggleButton from './ToggleButton';
import { useConfigService, usePanelService } from '../hooks';
import { AppContent } from '../AppTemplate';
import { IPanel } from '../../../core/dist';

function getStyle(
  position: string,
  opened: boolean,
  panelWidth: string | number,
) {
  const order = position === 'left' || position === 'top' ? -1 : 1;

  if (position === 'bottom' || position === 'top') {
    return {
      width: '100%',
      height: opened ? panelWidth : '0px',
      order,
    };
  }
  return {
    order,
    width: !opened ? '0px' : panelWidth,
  };
}

export default function AppPanel<T>() {
  const { globalConfig } = useConfigService<T>();
  const { siderBarService } = usePanelService();
  const { panel } = globalConfig;
  const { options = {} } = panel as IPanel;
  const panelWidth = useMemo(() => {
    return options?.width ?? '360px';
  }, [options?.width]);

  return isDisplay(panel?.display) ? (
    <div
      style={{
        ...getStyle(
          panel?.position || 'right',
          options?.opened || false,
          panelWidth,
        ),
        ...options?.style,
      }}
      className={styles.appPanel}
    >
      {options?.enableToggle && (
        <ToggleButton
          opened={!!options.opened}
          position={panel?.position || 'left'}
          setIsFold={() => {
            siderBarService.toggleOpen();
          }}
        />
      )}
      {console.log(panel?.children)}

      {/* 面板内容 */}
      <div style={{ display: options?.opened ? 'block' : 'none' }}>
        <AppContent items={panel?.children || []} />
      </div>
    </div>
  ) : (
    <></>
  );
}
