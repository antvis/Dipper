import { useEffect } from 'react';
import { Dipper } from '@antv/dipper-core';
import type { IConfig } from '@antv/dipper-core';
import { useState } from 'react';

export function useDipperContainer(cfg: IConfig | undefined): {
  sceneContainer: Dipper | undefined;
} {
  const [sceneContainer, setSceneContainer] = useState<Dipper>();
  useEffect(() => {
    if (cfg) {
      if (cfg.toolbar) {
        cfg.toolbar = Array.isArray(cfg.toolbar) ? cfg.toolbar : [cfg.toolbar];
      }
      const container = new Dipper(cfg) as Dipper;
      setSceneContainer(container);
    }
  }, [cfg]);

  return { sceneContainer };
}
