import React from 'react';
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
  const { map, popup } = globalConfig;
  console.log("children",children)
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
        }, 0);
      }}
    >
      {/* Popup */}
      {popup?.display && popup.lngLat && (
        <Popup lnglat={popup.lngLat} option={popup.options}>
          {popup.children}
        </Popup>
      )}
      {children}
    </AMapScene>
  );
}
