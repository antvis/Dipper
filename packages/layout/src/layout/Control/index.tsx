import React from 'react';
import { IControlWidgetsProps } from '@antv/dipper-core';
import { CustomControl, Control } from '@antv/l7-react';
import type { PositionName } from '@antv/l7';
import { CustomBaseWidgets } from '../../BaseWidget';

const DefaultControl = ['zoom', 'scale', 'layer'];
type IControlProps = 'zoom' | 'scale' | 'layer';
export default function BaseControl({
  controlGroupBy,
}: {
  controlGroupBy: {
    [key: string]: IControlWidgetsProps[];
  };
}) {
  return (
    <>
      {Object.keys(controlGroupBy).map((key: string) => {
        const [position, layout] = key.split('-');
        const flexDirection = layout === 'horizontal' ? 'row' : 'column';
        return (
          <CustomControl
            key={key}
            position={position as PositionName}
            style={{ display: 'flex', flexDirection, gap: '8px' }}
          >
            {controlGroupBy[key].map((c, index) => {
              if (DefaultControl.indexOf(c.type) === -1) {
                return <CustomBaseWidgets key={c.type + index} {...c} />;
              } else {
                const key = `${c.type}${index}`;
                return (
                  <Control
                    key={key}
                    type={c.type as IControlProps}
                    position={c?.position as PositionName}
                    {...c.options}
                  />
                );
              }
            })}
          </CustomControl>
        );
      })}
    </>
  );
}
