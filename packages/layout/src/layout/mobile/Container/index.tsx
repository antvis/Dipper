import React from 'react';
import Map from '../../Map';
import MapControl, { BottomControl } from '../MapControl';
import Layer from '../../Layer';

export function MapContainer({ children }: { children?: React.ReactNode }) {
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
      <BottomControl />
    </div>
  );
}
