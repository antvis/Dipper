import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { ISceneService } from '@antv/dipper-core';
import type { Scene } from '@antv/l7';
import { useEffect, useState } from 'react';

export function useSceneService() {
  const sceneService = useInjection<ISceneService>(TYPES.SCENE_SYMBOL);
  const [scene, setScene] = useState<Scene | null>(() => {
    return sceneService.getScene() ?? null;
  });
  const [position, setPosition] = useState<[number, number]>(null!);

  useEffect(() => {
    sceneService.on(
      'sceneChange',
      ({ scene:s, position:p }: { scene: Scene; position: [number, number] }) => {
        setScene(s);
        setPosition(p);
      },
    );
  }, [sceneService]);

  return {
    sceneService,
    scene,
    position,
  };
}
