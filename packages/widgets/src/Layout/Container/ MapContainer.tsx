import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Map from '../Map';
import MapControl from '../MapControl';
import Layer from '../Layer';
import Panel from '../Panel';
import type { IConfig, IPanel } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer, useConfigService } from '@antv/dipper-hooks';

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
          {/* 地图控件 图例、比例尺 */}
          <MapControl />
          {/* 添加图层 */}
          <Layer />

          {/* 自定义内容 */}
          {children}
        </>
      </Map>
      <Panel panel={panel as IPanel} />
      {/* 地图信息栏 */}
    </Content>
  );
}
