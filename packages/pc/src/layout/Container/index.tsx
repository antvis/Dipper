import React, { FC, useCallback, useEffect, useState } from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import DipperHeader, { IHeaderProps } from '../Header';
import ToolBar from '../Toolbar';
import { MapContainer } from '../MapContianer';
import { IConfig } from '@antv/dipper-core';
import { DipperContainerContext, IContainerProps, useConfigService } from '@antv/dipper-layout';

const Content: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { globalConfig } = useConfigService();
  const { panel, layers, controls } = globalConfig;
  return (
    <Layout className={styles.pageMap}>
      <DipperHeader {...(globalConfig?.headerbar as IHeaderProps)} />
      <ToolBar />
      <MapContainer {...{ panel, layers, controls }}>{children}</MapContainer>
    </Layout>
  );
};

export default function DipperContainer({ cfg, children, onLoad }: IContainerProps<IConfig>) {
  return (
    <DipperContainerContext cfg={cfg} onLoad={onLoad}>
      <Content>{children}</Content>
    </DipperContainerContext>
  );
}
