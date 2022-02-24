import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { Layout } from 'antd';
import styles from './index.less';
import { Provider } from 'inversify-react';
import ToolBar from '../Toolbar';
import type { IConfig } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import type { Container } from 'inversify';
import { useDipperContainer } from '@antv/dipper-layout-base';
import { AppHeader } from '../Header';
import { MapContainer } from '../MapContainer';

interface IContainerProps {
  cfg: IConfig;
  onLoad?: (sceneContainer: Dipper) => void;
  children?: React.ReactNode;
}

export function DipperContainer({ cfg, children, onLoad }: IContainerProps) {
  const { sceneContainer } = useDipperContainer(cfg);
  useUnmount(() => {
    if (sceneContainer) {
      sceneContainer.destroy();
    }
  });
  useEffect(() => {
    if (sceneContainer && onLoad) {
      onLoad(sceneContainer);
    }
  }, []);

  return sceneContainer ? (
    <>
      {/* 
        // @ts-ignore */}
      <Provider container={sceneContainer?.getContainer() as Container}>
        <Layout className={styles.pageMap}>
          {/* 导航栏 */}
          <AppHeader />

          {/* 导航栏工具条 */}
          <ToolBar />

          {/* 地图区域 */}
          <MapContainer>{children}</MapContainer>
        </Layout>
      </Provider>
    </>
  ) : null;
}
