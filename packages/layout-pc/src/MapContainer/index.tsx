import React from 'react';
import { Layout } from 'antd';
import { AppMap, AppLayerControl, useConfigService } from '@antv/dipper-layout-base';
import MapControl from '../MapControl';
import type { IPanel } from '@antv/dipper-core';
import { AppPanel } from '../Panel';

const { Content } = Layout;

export function MapContainer({ children }: { children?: React.ReactNode }) {
  const { globalConfig } = useConfigService();
  const { panel } = globalConfig;
  return (
    <Content
      style={{
        flexDirection: panel?.position === 'bottom' || panel?.position === 'top' ? 'column' : 'row',
      }}
    >
      {/* 地图 */}
      <AppMap>
        <>
          {/* 地图控件 图例、比例尺 */}
          <MapControl />
          {/* 添加图层 */}
          <AppLayerControl />

          {/* 自定义内容 */}
          {children}
        </>
      </AppMap>
      <AppPanel panel={panel as IPanel} />
      {/* 地图信息栏 */}
    </Content>
  );
}
