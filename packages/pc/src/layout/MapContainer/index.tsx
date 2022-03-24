import React from 'react';
import { Layout } from 'antd';
import MapControl from '../MapControls';
import Panel from '../Panel';
import type { IPanel, IControlWidgetsProps } from '@antv/dipper-core';
import { Map, Layer } from '@antv/dipper-layout';
import styles from './index.less';

const { Content } = Layout;
export interface IMapContainerProps {
  panel?: Partial<IPanel>;
  layers?: {
    type: string;
    options: any;
  }[];
  controls?: IControlWidgetsProps[]; // 自定义组件配置
  children?: React.ReactNode;
}

export function MapContainer(mapProps: IMapContainerProps) {
  const { panel, controls, layers, children } = mapProps;

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
          <MapControl controls={controls || []} />
          {/* 添加图层 */}
          <Layer layers={layers || []} />
          {/* 自定义内容 */}
          {children}
        </>
      </Map>
      <Panel panel={panel as IPanel} />
      {/* 地图信息栏 */}
    </Content>
  );
}
