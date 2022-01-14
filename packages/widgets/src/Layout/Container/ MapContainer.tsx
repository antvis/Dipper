import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Map from '../Map';
import type { IConfig, IPanel } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer, useConfigService } from '../../hooks';

const { Content } = Layout;

interface IContainerProps {
  cfg: IConfig;
  children?: React.ReactNode;
  onLoad?: (sceneContainer: Dipper) => void;
}

export function MapContainer({ children }: { children?: React.ReactNode }) {
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
      <Map>
        <>
          {/* 自定义内容 */}
          {children}
        </>
      </Map>
      {/* 地图信息栏 */}
    </Content>
  );
}
