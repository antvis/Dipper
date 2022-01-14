import { useConfigService } from '../hooks';
import React from 'react';
import { AppContent } from '../AppTemplate/Content';

export default function AppLayerControl() {
  const { globalConfig } = useConfigService();
  const { layers = [] } = globalConfig;

  return <AppContent items={layers} />;
}
