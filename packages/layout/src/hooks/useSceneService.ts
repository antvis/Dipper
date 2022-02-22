import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { ISceneService } from '@antv/dipper-core';
import { Scene } from '@antv/l7';
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
      ({ scene, position }: { scene: Scene; position: [number, number] }) => {
        setScene(scene);
        setPosition(position);
      },
    );
  }, [sceneService]);

  return {
    sceneService,
    scene,
    position,
  };
}
