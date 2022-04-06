import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import type { IHeaderProps } from '../Header';
import DipperHeader from '../Header';
import ToolBar from '../Toolbar';
import { MapContainer } from '../MapContainer';
import type { IConfig } from '@antv/dipper-core';
import type { IContainerProps } from '@antv/dipper-layout';
import { DipperContainerContext, useConfigService } from '@antv/dipper-layout';

const Content: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { globalConfig } = useConfigService();
  const { panel, layers, controls, toolbar, scene, mapType, map, popup } = globalConfig;
  return (
    <Layout className={styles.pageMap}>
      <DipperHeader {...(globalConfig?.headerbar as IHeaderProps)} />
      <ToolBar toolbars={toolbar || []} />
      <MapContainer {...{ panel, layers, controls, scene, mapType, map, popup }}>
        {children}
      </MapContainer>
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
