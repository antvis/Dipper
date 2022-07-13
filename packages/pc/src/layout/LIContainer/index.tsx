import type { IConfig } from '@antv/dipper-core';
import type { IContainerProps } from '@antv/dipper-layout';
import { DipperContainerContext, LayoutContent, useConfigService } from '@antv/dipper-layout';
import { Layout } from 'antd';
import React from 'react';
import styles from './index.less';
import { MapContainer } from './MapContainer';

const Content: React.FC = ({ children }) => {
  const { globalConfig } = useConfigService();
  const { panel, layers, controls, scene, mapType, map, popup, components = [] } = globalConfig;
  return (
    <Layout className={styles.LIContainer}>
      <MapContainer {...{ panel, layers, controls, scene, mapType, map, popup }}>
        <LayoutContent items={components} />
        {children}
      </MapContainer>
    </Layout>
  );
};

export default function LIContainer({ cfg, children, onLoad }: IContainerProps<Partial<IConfig>>) {
  return (
    <DipperContainerContext cfg={cfg} onLoad={onLoad}>
      <Content>{children}</Content>
    </DipperContainerContext>
  );
}
