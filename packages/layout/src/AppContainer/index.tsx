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

import type { IConfig, IPanel } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer, useConfigService } from '../hooks';
import type { Container } from 'inversify';

const { Content } = Layout;

interface IContainerProps {
  cfg: IConfig;
  children?: React.ReactNode;
  onLoad?: (sceneContainer: Dipper) => void;
}

export function ContainerContent({ children }: { children?: React.ReactNode }) {
  const { globalConfig } = useConfigService();
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
      <AppPanel panel={panel as IPanel} />
    </Content>
  );
}

export default function DipperContainer({
  cfg,
  children,
  onLoad,
}: IContainerProps) {
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

          <ContainerContent>{children}</ContainerContent>
        </Layout>
      </Provider>
    </>
  ) : (
    <></>
  );
}
