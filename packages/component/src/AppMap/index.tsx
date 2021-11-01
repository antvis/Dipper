import React, { useState } from 'react';
import { AMapScene, Popup } from '@antv/l7-react';
import type {} from '@antv/l7-react';
import styles from './index.less';
import { useSceneService, useConfigService } from '../hooks';

interface IProps {
  children?: JSX.Element;
}

export default function AppMap({ children }: IProps) {
  const { sceneService } = useSceneService();
  const { globalConfig } = useConfigService();
  const [isLoaded, setLoaded] = useState(false);
  const { map, popup } = globalConfig;
  return (
    <AMapScene
      className={styles.appMap}
      map={map!}
      option={{
        logoPosition: 'bottomright',
      }}
      onSceneLoaded={(newScene) => {
        setTimeout(() => {
          sceneService.setScene(newScene);
          setLoaded(true);
        }, 0);
      }}
    >
      {/* Popup */}
      {popup?.display && popup.lngLat && (
        <Popup lnglat={popup.lngLat} option={popup.options}>
          {popup.children}
        </Popup>
      )}
      {isLoaded && children}
    </AMapScene>
  );
}
