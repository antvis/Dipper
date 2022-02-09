import { Select } from 'antd';
import React from 'react';
import { IWidgetProps } from '@antv/dipper-core';

export function DipperSelect({ widget }: IWidgetProps) {
  return (
    <Select
      defaultValue={widget?.getValue()}
      options={widget?.getOptions().options?.optionsData || []}
      bordered={false}
      style={{ width: 180 }}
      allowClear={false}
      onChange={(e: any) => {
        widget?.setValues(e);
      }}
    />
  );
}
