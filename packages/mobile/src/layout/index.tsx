import React, { useEffect } from 'react';
import styles from './index.less';
import ToolBar from './Toolbar';
import DipperHeader from './Header';
import { DipperContainerContext, IContainerProps } from '@antv/dipper-layout';
import { MapContainer } from './Container';
export default function DipperMobileContainer({ cfg, children, onLoad }: IContainerProps) {
  return (
    <DipperContainerContext cfg={cfg} onLoad={onLoad}>
      <div className={styles.pageMap}>
        {/* 导航栏 */}
        <DipperHeader />

        {/* 导航栏工具条 */}
        <ToolBar />
        {/* 地图区域 */}
        <MapContainer>{children}</MapContainer>
      </div>
    </DipperContainerContext>
  );
}
