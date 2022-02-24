import { useInjection } from 'inversify-react';
import { TYPES } from '@antv/dipper-core';
import type { IWidgetsService } from '@antv/dipper-core';
import { useContainer } from '../context/ContainerContext';

export function useWidgetsService() {
  // const widgetsService = useInjection<IWidgetsService>(TYPES.WIDGETS_SYMBOL);
  const container = useContainer();
  const widgetsService = container.get<IWidgetsService>(TYPES.WIDGETS_SYMBOL);
  return {
    widgetsService,
  };
}
