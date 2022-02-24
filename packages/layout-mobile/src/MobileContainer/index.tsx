import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import styles from './index.less';
import { Provider } from 'inversify-react';
import { MobileMapToolbar } from '../MobileMapToolbar';
import type { IConfig } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import type { Container } from 'inversify';
import { MobileMapContainer } from '../MobileMapContainer';
import { ContainerProvider, useDipperContainer } from '@antv/dipper-layout-base';
import { MobileHeader } from '../MobileHeader';

interface IContainerProps {
  cfg: IConfig;
  onLoad?: (sceneContainer: Dipper) => void;
  children?: React.ReactNode;
}

export function DipperMobileContainer({ cfg, children, onLoad }: IContainerProps) {
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

  const container = sceneContainer?.getContainer();
  console.log(container);
  return container ? (
    <ContainerProvider container={container}>
      <div className={styles.pageMap}>
        {/* 导航栏 */}
        <MobileHeader />

        {/* 导航栏工具条 */}
        <MobileMapToolbar />

        {/* 地图区域 */}
        <MobileMapContainer>{children}</MobileMapContainer>
      </div>
    </ContainerProvider>
  ) : null;
}
