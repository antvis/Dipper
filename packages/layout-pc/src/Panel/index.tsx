import React, { useMemo } from 'react';
import styles from './index.less';
import ToggleButton from './ToggleButton';
import { IPanel, getWidgetChildren } from '@antv/dipper-core';
import { isDisplay, LayoutContent, usePanelService } from '@antv/dipper-layout-base';

function getStyle(position: string, opened: boolean, panelWidth: string | number) {
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

export function AppPanel({ panel }: { panel: Partial<IPanel> }) {
  const { siderBarService } = usePanelService();
  const { options = {} } = panel as IPanel;
  const panelWidth = useMemo(() => {
    return options?.width ?? '360px';
  }, [options?.width]);

  return isDisplay(panel?.display) ? (
    <div
      style={{
        ...getStyle(panel?.position || 'right', options?.opened || false, panelWidth),
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

      {/* 面板内容 */}
      <div
        style={{
          display: options?.opened ? 'flex' : 'none',
          overflowY: 'auto',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <LayoutContent items={getWidgetChildren(panel)} />
      </div>
    </div>
  ) : (
    <></>
  );
}
