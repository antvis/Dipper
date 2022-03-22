import React from 'react';
import { Layout } from 'antd';
import MapControl from '../MapControl';
import Panel from '../Panel';
import type { IConfig, IPanel } from '@antv/dipper-core';
import { useConfigService, Map, Layer } from '@antv/dipper-layout';
import styles from './index.less';

const { Content } = Layout;

export function MapContainer({ children }: { children?: React.ReactNode }) {
  const { globalConfig } = useConfigService();
  const { panel } = globalConfig;
  return (
    <Content
      className={styles.antLayoutContentMap}
      style={{
        flexDirection: panel?.position === 'bottom' || panel?.position === 'top' ? 'column' : 'row',
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
