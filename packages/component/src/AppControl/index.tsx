import React, { ReactElement } from 'react';
import { isDisplay } from '../utils';
import { Control, CustomControl } from '@antv/l7-react';
import type { IControlOption } from '@antv/l7';
import { getWidget } from '@antv/dipper-core';
import { useConfigService } from '../hooks';
import { AppMapControlContent } from '../AppTemplate';

export default function AppControl() {
  const { globalConfig } = useConfigService();
  const { controls, legends = [], defaultcontrols } = globalConfig;
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
      {controls
        ?.filter((item: any) => isDisplay(item.display))
        .map((item: any, index: number) => {
          const key = `${item.type}${index}`;
          const { position, type } = item as IControlOption;
          return (
            <CustomControl key={key} position={position || 'bottomleft'}>
              {getWidget(type)(item) as ReactElement}
            </CustomControl>
          );
        })}
      {/* 添加图例 */}
      <AppMapControlContent items={legends} />
    </>
  );
}
