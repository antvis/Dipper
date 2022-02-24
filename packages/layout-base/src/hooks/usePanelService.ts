import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { IPanelService } from '@antv/dipper-core';
import { useContainer } from '../context/ContainerContext';

export function usePanelService() {
  // const siderBarService = useInjection<IPanelService>(TYPES.PANEL_SYMBOL);
  const container = useContainer();
  const siderBarService = container.get(TYPES.PANEL_SYMBOL);
  return {
    siderBarService,
  };
}
