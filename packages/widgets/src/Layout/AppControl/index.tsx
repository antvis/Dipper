import React from 'react';
import { Control, CustomControl } from '@antv/l7-react';
import type { IControlOption, PositionName } from '@antv/l7';
import { getWidget, IConfig, IControlWidgetsProps } from '@antv/dipper-core';
import { AppMapControlContent } from '../AppTemplate';
import { BaseLayoutComp } from '../BaseLayoutComp';
import { CustomBaseWidgets } from '../../BaseWidget/widget';

export function DipperControl(props: IControlWidgetsProps) {
  const { display = true, position, layout, type } = props || {};
  const flexDirection = layout === 'horizontal' ? 'row' : 'column';
  return display ? (
    <CustomBaseWidgets type="controlItem">
      <CustomControl
        position={position as PositionName}
        style={{ display: 'flex', flexDirection, gap: '8px' }}
      >
        <>{getWidget(type)(props)}</>
      </CustomControl>
    </CustomBaseWidgets>
  ) : null;
}

function DefaultControl(props: IControlOption) {
  const { display = true, type, position, options } = props;
  return display ? (
    <CustomBaseWidgets type="defaultControlItem">
      <Control type={type} position={position} {...options} />
    </CustomBaseWidgets>
  ) : null;
}

export default function AppControl(
  props: Pick<IConfig, 'controls' | 'defaultcontrols' | 'legends'>,
) {
  const { controls, legends = [], defaultcontrols } = props || {};

  return (
    <>
      <BaseLayoutComp type="defaultControl" {...defaultcontrols}>
        <>
          {defaultcontrols?.map((defaultcontrol, index) => (
            // @ts-ignore
            <DefaultControl key={index} {...defaultcontrol} name={`${index}`} />
          ))}
        </>
      </BaseLayoutComp>
      <BaseLayoutComp type="control" {...controls}>
        <>
          {controls?.map((control, index) => (
            <DipperControl key={index} {...control} />
          ))}
        </>
      </BaseLayoutComp>
      {/* 添加图例, TODO: 可否合并 */}
      <BaseLayoutComp type="legends">
        <AppMapControlContent items={legends} />
      </BaseLayoutComp>
    </>
  );
}
