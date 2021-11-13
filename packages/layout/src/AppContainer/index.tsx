import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { Layout } from 'antd';
import styles from './index.less';
import AppHeader from '../AppHeader';
import AppToolbar from '../AppToolbar';
import AppControl from '../AppControl';
import AppPanel from '../AppPanel';
import AppLayerControl from '../AppLayer';
import AppMap from '../AppMap';
import { Provider } from 'inversify-react';

import type { IConfig, IConfigService } from '@antv/dipper-core';
import { TYPES } from '@antv/dipper-core';
import { useSceneContainer, useConfigService } from '../hooks';
import type { Container } from 'inversify';

const { Content } = Layout;

interface IContainerProps<T> {
  cfg: IConfig<T>;
  children?: React.ReactNode;
}

export function ContainerContent<T>({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { globalConfig } = useConfigService<T>();
  const { panel } = globalConfig;
  return (
    <Content
      style={{
        flexDirection:
          panel?.position === 'bottom' || panel?.position === 'top'
            ? 'column'
            : 'row',
      }}
    >
      {/* 地图 */}
      <AppMap>
        <>
          {/* 地图控件 图例、比例尺 */}
          <AppControl />
          {/* 添加图层 */}
          <AppLayerControl />
          {/* 自定义内容 */}
          {children}
        </>
      </AppMap>
      {/* 地图信息栏 */}
      <AppPanel />
    </Content>
  );
}

export default function SceneContainer<T>({
  cfg,
  children,
}: IContainerProps<T>) {
  const { sceneContainer } = useSceneContainer<T>(cfg);
  useUnmount(() => {
    if (sceneContainer) {
      sceneContainer.reset();
    }
  });

  return sceneContainer ? (
    <>
      {/* 
        // @ts-ignore */}
      <Provider container={sceneContainer?.getContainer() as Container}>
        <Layout className={styles.pageMap}>
          {/* 导航栏 */}
          <AppHeader />
          {/* 导航栏工具条 */}
          <AppToolbar />
          {/* 地图区域 */}

          <ContainerContent<T>>{children}</ContainerContent>
        </Layout>
      </Provider>
    </>
  ) : (
    <></>
  );
}
