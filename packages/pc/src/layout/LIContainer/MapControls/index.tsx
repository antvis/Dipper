import type { IControlWidgetsProps } from '@antv/dipper-core';
import { isDisplay } from '@antv/dipper-core';
import { CustomBaseWidgets } from '@antv/dipper-layout';
import type { PositionName } from '@antv/l7';
import { CustomControl } from '@antv/larkmap';
import { groupBy } from 'lodash';
import React, { useMemo } from 'react';

function BaseControl({
  controlGroupBy,
}: {
  controlGroupBy: Record<string, IControlWidgetsProps[]>;
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
            {controlGroupBy[key].map((item, index) => (
              <CustomBaseWidgets key={item.type + index} {...item} />
            ))}
          </CustomControl>
        );
      })}
    </>
  );
}

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

  return <BaseControl controlGroupBy={controlGroupBy} />;
}
