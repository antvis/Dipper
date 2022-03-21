import { Cascader } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import { IWidget, IWidgetProps } from '@antv/dipper-core';

export function CitySelect({
  widget,
}: IWidgetProps & {
  widget: IWidget;
}) {
  return (
    <Cascader
      defaultValue={widget?.getValue() as Array<any>}
      style={{ width: 180 }}
      bordered={false}
      options={(widget?.getOptions().options?.data as Array<any>) || []}
      allowClear={false}
      onChange={(e: any) => {
        widget?.setValues(e);
      }}
      placeholder="选择城市"
    />
  );
}
