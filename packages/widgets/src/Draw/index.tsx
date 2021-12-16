import React, { useEffect } from 'react';
import { DrawControl } from '@antv/l7-draw';
import { useSceneValue } from '@antv/l7-react';
import type { IWidgetProps } from '@antv/dipper-core';
import type { PositionName } from '@antv/l7';
import { useConfigService } from '@antv/dipper-layout';

export const Draw = (props: IWidgetProps<PositionName>) => {
  const { setWidgetsValue } = useConfigService();
  const scene = useSceneValue();
  useEffect(() => {
    const drawControl = new DrawControl(scene, {
      position: props.position as PositionName,
      layout: 'vertical', // horizontal vertical
      controls: {
        point: true,
        polygon: true,
        line: true,
        // circle: true,
        // rect: true,
        // delete: true,
        ruler: true,
      },
    });
    scene.addControl(drawControl);

    drawControl.on('draw.create', (e) => {
      setWidgetsValue('drawData', e);
    });
  }, []);

  return <></>;
};
