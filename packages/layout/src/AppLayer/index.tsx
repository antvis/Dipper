import { useConfigService } from '../hooks';
import React from 'react';
import { AppContent } from '../AppTemplate';

export default function AppLayerControl<T>() {
  const { globalConfig } = useConfigService();
  const { layers = [] } = globalConfig;

  return <AppContent items={layers} />;
}
