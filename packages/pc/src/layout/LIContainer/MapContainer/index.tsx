import type { IControlWidgetsProps, IMapProps, IPanel } from '@antv/dipper-core';
import { Layer } from '@antv/dipper-layout';
import { Layout } from 'antd';
import React from 'react';
import Panel from '../../Panel';
import MapControls from '../MapControls';
import styles from './index.less';
import Map from './Map';

export interface MapContainerProps extends IMapProps {
  /**  地图右侧信息面板 */
  panel?: Partial<IPanel>;
  /** 地图可视化图层组件 */
  layers?: { type: string; options: any }[];
  /** 地图控件图层 */
  controls?: IControlWidgetsProps[]; // 自定义组件配置
}

export function MapContainer(mapContainerProps: MapContainerProps) {
  const { panel = {}, controls = [], layers = [], children, ...mapProps } = mapContainerProps;

  return (
    <Layout.Content
      className={styles['map-container']}
      style={{
        flexDirection: panel?.position === 'bottom' || panel?.position === 'top' ? 'column' : 'row',
      }}
    >
      {/* 地图 */}
      <Map {...mapProps}>
        <>
          {/* 地图控件 */}
          <MapControls controls={controls} />
          {/* 添加图层 */}
          <Layer layers={layers} />
          {/* 自定义内容 */}
          {children}
        </>
      </Map>
      <Panel panel={panel as IPanel} />
      {/* 地图信息栏 */}
    </Layout.Content>
  );
}
