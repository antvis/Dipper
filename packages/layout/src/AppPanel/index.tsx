import React, { useMemo } from 'react';
import './index.less';
import { isDisplay } from '../utils';
import ToggleButton from './ToggleButton';
import { useConfigService, usePanelService } from '../hooks';
import { AppContent } from '../AppTemplate';

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
  const panelWidth = useMemo(() => {
    return panel?.width ?? '360px';
  }, [panel?.width]);
  return isDisplay(panel?.display) ? (
    <div
      style={{
        ...getStyle(
          panel?.position || 'right',
          panel?.opened || false,
          panelWidth,
        ),
        ...panel?.style,
      }}
      className="appPanel"
    >
      {panel?.enableToggle && (
        <ToggleButton
          isFold={!!panel.opened}
          position={panel?.position || 'left'}
          setIsFold={() => {
            siderBarService.toggleOpen();
            // setConfig('panel', {
            //   open: !panel.opened,
            // })
          }}
        />
      )}

      {/* 面板内容 */}
      <AppContent items={panel?.children || []} />
    </div>
  ) : (
    <></>
  );
}
