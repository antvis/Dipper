import { useEffect } from 'react';
import { Dipper } from '@antv/dipper-core';
import type { IBaseConfig } from '@antv/dipper-core';
import { useState } from 'react';

export function useDipperContainer<T = any>(
  cfg: (IBaseConfig & T) | undefined,
): {
  sceneContainer: Dipper | undefined;
} {
  const [sceneContainer, setSceneContainer] = useState<Dipper>();
  useEffect(() => {
    if (cfg) {
      // @ts-ignore
      if (cfg?.toolbar) {
        // @ts-ignore // TODO 转移到特定的layout
        cfg.toolbar = Array.isArray(cfg.toolbar) ? cfg.toolbar : [cfg.toolbar];
      }
      const container = new Dipper(cfg) as Dipper;
      setSceneContainer(container);
    }
  }, [cfg]);

  return { sceneContainer };
}
