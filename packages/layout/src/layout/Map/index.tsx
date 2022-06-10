import type { IMapProps } from '@antv/dipper-core';
import { AMapScene, AMapSceneV2, MapboxScene, MapScene } from '@antv/l7-react';
import React, { useState } from 'react';
import { CustomBaseWidgets } from '../../BaseWidget';
import { useSceneService } from '../../hooks';
import styles from './index.less';

export default function AppMap({ map, mapType, popup, scene, children }: IMapProps) {
  const { sceneService } = useSceneService();
  const [isLoaded, setLoaded] = useState(false);
  const getMap = (type = 'GaodeV1') => {
    const content = () => {
      return (
        <>
          {/* @ts-ignore */}
          {popup && <CustomBaseWidgets type="popup" {...popup} />}
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
