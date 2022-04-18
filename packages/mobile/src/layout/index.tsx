import type { FC } from 'react';
import React from 'react';
import styles from './index.less';
import ToolBar from './Toolbar';
import DipperHeader from './Header';
import type { IContainerProps } from '@antv/dipper-layout';
import { DipperContainerContext, useConfigService } from '@antv/dipper-layout';
import { MapContainer } from './Container';

const Content: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { globalConfig } = useConfigService();
  const { panel, layers, controls, mapType, map, popup, toolbar } = globalConfig;
  return (
    <div className={styles.pageMap}>
      <DipperHeader />
      {/* 导航栏工具条 */}
      <ToolBar toolbars={toolbar || []} />
      {/* 地图区域 */}
      <MapContainer {...{ panel, layers, controls, mapType, map, popup }}>{children}</MapContainer>
    </div>
  );
};

export default function DipperMobileContainer({ cfg, children, onLoad }: IContainerProps) {
  return (
    <DipperContainerContext cfg={cfg} onLoad={onLoad}>
      <Content>{children}</Content>
    </DipperContainerContext>
  );
}
