import React, { useEffect } from 'react';
import Map from '../../Map';
import MapControl from '../../MapControl';
import Layer from '../../Layer';
import { FloatingPanel } from 'antd-mobile';
import type { IConfig, IPanel } from '@antv/dipper-core';
import { Dipper } from '@antv/dipper-core';
import { useDipperContainer, useConfigService } from '../../../hooks';
const anchors = [28, window.innerHeight * 0.4, window.innerHeight * 0.8];

interface IContainerProps {
  cfg: IConfig;
  children?: React.ReactNode;
  onLoad?: (sceneContainer: Dipper) => void;
}

export function MapContainer({ children }: { children?: React.ReactNode }) {
  const { globalConfig } = useConfigService();
  const { panel } = globalConfig;
  return (
    <div
      style={{
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        display: 'flex',
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
      {/* <div style={{height:'200px'}}> */}
      <FloatingPanel style={{ zIndex: 10000 }} anchors={anchors}>
        测试
      </FloatingPanel>
      {/* </div> */}

      {/* 地图信息栏 */}
    </div>
  );
}
