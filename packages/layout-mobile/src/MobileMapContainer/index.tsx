import { AppLayerControl, AppMap } from '@antv/dipper-layout-base';
import React from 'react';
import MapControl, { BottomControl } from '../MobileMapControl';
import styles from './index.less';
export function MobileMapContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.pageMap}>
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
      <BottomControl />
    </div>
  );
}
