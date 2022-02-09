import React, { Children, FC, useEffect } from 'react';
import { useUnmount } from 'ahooks';
import styles from './index.less';

import { Provider } from 'inversify-react';
import { NavBar } from 'antd-mobile';
import ToolBar from '../../Toolbar';
import { MapContainer } from './ MapContainer';
import type { IConfig } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer } from '../../../hooks';
import type { Container } from 'inversify';

interface IContainerProps {
  cfg: IConfig;
  onLoad?: (sceneContainer: Dipper) => void;
  children?: React.ReactNode;
}

export default function DipperMobileContainer({ cfg, children, onLoad }: IContainerProps) {
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
        <div className={styles.pageMap}>
          {/* 导航栏 */}
          {/* <DipperHeader /> */}
          <NavBar>标题1</NavBar>
          {/* 导航栏工具条 */}
          <ToolBar />

          {/* 地图区域 */}
          <MapContainer>{children}</MapContainer>
        </div>
      </Provider>
    </>
  ) : (
    <></>
  );
}
