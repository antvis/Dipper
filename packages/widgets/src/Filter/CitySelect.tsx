import { Cascader } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import type { IWidget, IWidgetProps } from '@antv/dipper-core';

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
