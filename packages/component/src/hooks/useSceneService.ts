import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { ISceneService } from '@antv/dipper-core';

export function useSceneService() {
  const sceneService = useInjection<ISceneService>(TYPES.SCENE_SYMBOL);
  return {
    sceneService,
  };
}
