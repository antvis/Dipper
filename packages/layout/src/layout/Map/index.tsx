import React, { useState } from 'react';
import { AMapScene, AMapSceneV2, Popup, MapboxScene, MapScene } from '@antv/l7-react';
import type {} from '@antv/l7-react';
import styles from './index.less';
import { useSceneService, useConfigService } from '../../hooks';

export default function AppMap({ children }: { children?: JSX.Element }) {
  const { sceneService } = useSceneService();
  const { globalConfig } = useConfigService();
  const [isLoaded, setLoaded] = useState(false);
  const { map, mapType, popup, scene } = globalConfig;
  const getMap = (type = 'GaodeV1') => {
    const content = () => {
      return (
        <>
          {popup?.display && popup.lngLat && (
            <Popup lnglat={popup.lngLat} option={popup.options}>
              {popup.children}
            </Popup>
          )}
          {isLoaded && children}
        </>
      );
    };
    const mapLoaded = (newScene: any) => {
      setTimeout(() => {
        sceneService.setScene(newScene);
        setLoaded(true);
      }, 0);
    };
    if (type === 'GaodeV2') {
      return (
        <AMapSceneV2 className={styles.appMap} map={map!} option={scene} onSceneLoaded={mapLoaded}>
          {content()}
        </AMapSceneV2>
      );
    }

    if (type === 'Map') {
      return (
        <MapScene className={styles.appMap} map={map!} option={scene} onSceneLoaded={mapLoaded}>
          {content()}
        </MapScene>
      );
    }
    if (type === 'MapBox') {
      return (
        <MapboxScene className={styles.appMap} map={map!} option={scene} onSceneLoaded={mapLoaded}>
          {content()}
        </MapboxScene>
      );
    }
    return (
      <AMapScene className={styles.appMap} map={map!} option={scene} onSceneLoaded={mapLoaded}>
        {content()}
      </AMapScene>
    );
  };
  return getMap(mapType);
}
