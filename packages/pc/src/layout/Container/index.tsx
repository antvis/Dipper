import React, { useEffect } from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import DipperHeader from '../Header';
import ToolBar from '../Toolbar';
import { MapContainer } from './MapContainer';
import { IConfig } from '@antv/dipper-core';
import { DipperContainerContext, IContainerProps } from '@antv/dipper-layout';
export default function DipperContainer({ cfg, children, onLoad }: IContainerProps<IConfig>) {
  return (
    <DipperContainerContext cfg={cfg} onLoad={onLoad}>
      <Layout className={styles.pageMap}>
        {/* 导航栏 */}
        <DipperHeader />

        {/* 导航栏工具条 */}
        <ToolBar />

        {/* 地图区域 */}
        <MapContainer>{children}</MapContainer>
      </Layout>
    </DipperContainerContext>
  );
}
