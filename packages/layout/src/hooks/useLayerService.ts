import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { ILayerService } from '@antv/dipper-core';

export function useLayerService() {
  const layerService = useInjection<ILayerService>(TYPES.LAYER_SYMBOL);
  return {
    layerService,
  };
}
