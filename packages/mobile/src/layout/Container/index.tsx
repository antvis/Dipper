import React from 'react';
import { Map, Layer } from '@antv/dipper-layout';
import MapControl from '../MapControl';
import { MapPanel } from '../Panel';
import { SceneContext } from '@antv/l7-react';
import type { IPanel, IControlWidgetsProps, IMapProps } from '@antv/dipper-core';
import { useSceneService } from '@antv/dipper-layout';
import styles from './index.less';

export interface IMapContainerProps extends IMapProps {
  panel?: Partial<IPanel>;
  layers?: {
    type: string;
    options: any;
  }[];
  controls?: IControlWidgetsProps[]; // 自定义组件配置
}

export function MapContainer(mapContainerProps: IMapContainerProps) {
  const { panel, controls, layers, children, ...mapProps } = mapContainerProps;
  const { scene } = useSceneService();
  return (
    <div className={styles.pageMap}>
      {/* 地图 */}
      <Map {...mapProps}>
        <>
          {/* 地图控件 图例、比例尺 */}
          <MapControl />
          {/* 添加图层 */}
          <Layer layers={layers || []} />

          {/* 自定义内容 */}
          {children}
        </>
      </Map>
      {/* 地图上下滑块 */}
      {scene && (
        <SceneContext.Provider value={scene!}>
          <MapPanel />
        </SceneContext.Provider>
      )}
    </div>
  );
}
