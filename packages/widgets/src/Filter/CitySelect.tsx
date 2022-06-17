import type { IWidget, IWidgetProps } from '@antv/dipper-core';
import { Cascader } from 'antd';
import React from 'react';

export function CitySelect({
  widget,
}: IWidgetProps & {
  widget: IWidget;
}) {
  return (
    <Cascader
      defaultValue={widget?.getValue() as any[]}
      style={{ width: 180 }}
      bordered={false}
      options={(widget?.getOptions().options?.data as any[]) || []}
      allowClear={false}
      onChange={(e: any) => {
        widget?.setValue(e);
      }}
      placeholder="选择城市"
    />
  );
}
