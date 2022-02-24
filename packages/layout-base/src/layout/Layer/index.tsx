import { useConfigService } from '../../hooks';
import React from 'react';
import { LayoutContent } from '../baseLayout';

export function AppLayerControl() {
  const { globalConfig } = useConfigService();
  const { layers = [] } = globalConfig;

  return <LayoutContent items={layers} />;
}
