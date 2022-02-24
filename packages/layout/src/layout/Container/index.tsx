import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { Layout } from 'antd';
import styles from './index.less';
import { Provider } from 'inversify-react';
import DipperHeader from '../Header';
import ToolBar from '../Toolbar';
import { MapContainer } from './MapContainer';
import { DipperContainerContext } from './Context';
import type { IConfig } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';

interface IContainerProps {
  cfg: IConfig;
  onLoad?: (sceneContainer: Dipper) => void;
  children?: React.ReactNode;
}

export default function DipperContainer({ cfg, children, onLoad }: IContainerProps) {
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
