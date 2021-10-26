import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { ISideBarService } from '@antv/dipper-core';

export function useSidebarService() {
  const siderBarService = useInjection<ISideBarService>(TYPES.SIDEBAR_SYMBOL);
  return {
    siderBarService,
  };
}
