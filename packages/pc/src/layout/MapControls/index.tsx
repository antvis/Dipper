import React, { ReactElement, useMemo } from 'react';
import { isDisplay, IWidgetProps, IControlWidgetsProps } from '@antv/dipper-core';
import { CustomControl, Control } from '@antv/l7-react';
import type { IControlOption, PositionName } from '@antv/l7';
import { CustomBaseWidgets } from '@antv/dipper-layout';

import { groupBy } from 'lodash';
const DefaultControl = ['zoom', 'scale', 'layer'];
type IControlProps = 'zoom' | 'scale' | 'layer';
export default function MapControls({ controls }: { controls: IControlWidgetsProps[] }) {
  const controlGroupBy = useMemo(() => {
    return groupBy(
      controls?.filter((item: any) => isDisplay(item.display)),
      (c) => {
        const defaultLayout = (c.position || 'topleft') === 'topleft' ? 'horizontal' : 'vertical';
        return [c.position || 'topleft', c.layout || defaultLayout].join('-');
      },
    );
  }, [controls]);

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
