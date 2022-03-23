import { useConfigService } from '../../hooks';
import React from 'react';
import { LayoutContent } from '../baseLayout';

export default function AppLayerControl({
  layers,
}: {
  layers: {
    type: string;
    options: any;
  }[];
}) {
  return <LayoutContent items={layers} />;
}
