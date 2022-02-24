import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { ILayerService } from '@antv/dipper-core';
import { useContainer } from '../context/ContainerContext';

export function useLayerService() {
  // const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
  const container = useContainer();
  const layerService = container.get<ILayerService>(TYPES.LAYER_SYMBOL);
  return {
    layerService,
  };
}
