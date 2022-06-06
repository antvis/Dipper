import type { IMapProps } from '@antv/dipper-core';
import { useSceneService } from '@antv/dipper-layout';
import { LarkMap } from '@antv/larkmap';
import React from 'react';
import styles from './index.less';

export default function Map({ map, mapType, popup, scene, children }: IMapProps) {
  const { sceneService } = useSceneService();

  const content = () => {
    return (
      <>
        {/* {popup?.display && popup.lngLat && (
          <Popup lnglat={popup.lngLat} option={popup.options}>
            {popup.children}
          </Popup>
        )} */}
        {children}
      </>
    );
  };

  const mapLoaded = (newScene: any) => {
    sceneService.setScene(newScene);
  };

  return (
    <LarkMap className={styles.map} mapType={mapType} mapOptions={map!} onSceneLoaded={mapLoaded}>
      {content()}
    </LarkMap>
  );
}
