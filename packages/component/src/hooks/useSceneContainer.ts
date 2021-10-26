import { useEffect } from 'react';
import { SceneContainer } from '@antv/dipper-core';
import type { IConfig } from '@antv/dipper-core';
import { useState } from 'react';

export function useSceneContainer<T>(cfg: IConfig<T> | undefined) {
  const [sceneContainer, setSceneContainer] = useState<SceneContainer<T>>();
  useEffect(() => {
    if (cfg) {
      const container = new SceneContainer<T>(cfg);
      setSceneContainer(container);
    }
  }, [cfg]);

  return { sceneContainer };
}
