import { useEffect } from 'react';
import { useSceneService } from './useSceneService';
import { useMemoizedFn } from 'ahooks';

export function useSceneEvent(eventName: string, callback: (params: any) => any) {
  const { scene } = useSceneService();
  const cb = useMemoizedFn(callback);
  useEffect(() => {
    scene?.on(eventName, callback);
    return () => {
      scene?.off(eventName, callback);
    };
  }, [scene, cb, eventName]);
}
