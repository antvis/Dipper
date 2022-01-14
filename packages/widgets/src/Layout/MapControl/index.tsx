import React, { ReactElement, useMemo } from 'react';
import { isDisplay } from '../../util/ui';
import { Control, CustomControl } from '@antv/l7-react';
import type { IControlOption, PositionName } from '@antv/l7';
import { getWidget } from '@antv/dipper-core';
import { useConfigService } from '../../hooks';
import { AppMapControlContent } from '../baseLayout';
import { CustomBaseWidgets } from '../../BaseWidget/widget';
import { groupBy } from 'lodash';

export default function AppControl() {
  const { globalConfig } = useConfigService();
  const { controls, legends = [], defaultcontrols } = globalConfig;
  const controlGroupBy = useMemo(() => {
    return groupBy(
      controls?.filter((item: any) => isDisplay(item.display)),
      (c) => {
        return [c.position, c.layout || 'vertical'].join('-');
      },
    );
  }, [controls]);

  return (
    <>
      {defaultcontrols
        ?.filter((item: any) => isDisplay(item.display))
        .map((item: any, index: number) => {
          const key = `${item.type}${index}`;
          const { position } = item as IControlOption;
          return (
            <Control
              key={key}
              type={item.type}
              position={position}
              {...item.options}
            />
          );
        })}
      {Object.keys(controlGroupBy).map((key: string) => {
        const [position, layout] = key.split('-');

        const flexDirection = layout === 'horizontal' ? 'row' : 'column';
        return (
          <CustomControl
            key={key}
            position={position as PositionName}
            style={{ display: 'flex', flexDirection, gap: '8px' }}
          >
            {controlGroupBy[key].map((c) => (
              <CustomBaseWidgets {...c} />
            ))}
          </CustomControl>
        );
      })}
      {/* 添加图例 */}
      <AppMapControlContent items={legends} />
    </>
  );
}
