import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { IWidgetsService } from '@antv/dipper-core';

export function useWidgetsService() {
  const widgetsService = useInjection<IWidgetsService>(TYPES.WIDGETS_SYMBOL);
  return {
    widgetsService,
  };
}
