import React from 'react';
import { Layout } from 'antd';
import MapControl from '../MapControls';
import Panel from '../Panel';
import type { IPanel, IControlWidgetsProps, IMapProps } from '@antv/dipper-core';
import { Map, Layer } from '@antv/dipper-layout';
import styles from './index.less';

const { Content } = Layout;
export interface IMapContainerProps extends IMapProps {
  /**  地图右侧信息面板 */
  panel?: Partial<IPanel>;
  /** 地图可视化图层组件 */
  layers?: {
    type: string;
    options: any;
  }[];
  /** 地图控件图层 */
  controls?: IControlWidgetsProps[]; // 自定义组件配置
}
export function MapContainer(mapContainerProps: IMapContainerProps) {
  const { panel = {}, controls, layers, children, ...mapProps } = mapContainerProps;

  return (
    <Content
      className={styles.antLayoutContentMap}
      style={{
        flexDirection: panel?.position === 'bottom' || panel?.position === 'top' ? 'column' : 'row',
      }}
    >
      {/* 地图 */}
      <Map {...mapProps}>
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
