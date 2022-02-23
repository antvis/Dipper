import React from 'react';
import Map from '../Map';
import MapControl, { BottomControl } from '../MapControl';
import Layer from '../Layer';
import styles from './index.less';
export function MapContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.pageMap}>
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
      <BottomControl />
    </div>
  );
}
