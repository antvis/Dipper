import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { IPanelService } from '@antv/dipper-core';

export function usePanelService() {
  const siderBarService = useInjection<IPanelService>(TYPES.PANEL_SYMBOL);
  return {
    siderBarService,
  };
}
