import React, { useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { Layout } from 'antd';
import styles from './index.less';

import { Provider } from 'inversify-react';
import DipperHeader from '../Header';
import { MapContainer } from './ MapContainer';
import type { IConfig, IPanel } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer, useConfigService } from '../../hooks';
import type { Container } from 'inversify';

const { Content } = Layout;

interface IContainerProps {
  cfg: IConfig;
  children?: React.ReactNode;
  onLoad?: (sceneContainer: Dipper) => void;
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
          <DipperHeader />
          <MapContainer>{children} </MapContainer>
        </Layout>
      </Provider>
    </>
  ) : (
    <></>
  );
}
