import { Select } from 'antd';
import React from 'react';
import type { IWidgetProps } from '@antv/dipper-core';

export function DipperSelect({ widget }: IWidgetProps) {
  const options = widget?.getOptions();

  return (
    <Select
      defaultValue={widget?.getValue()}
      options={options?.options?.optionsdata || []}
      showSearch={options?.showSearch}
      placeholder={options?.placeholder}
      bordered={false}
      style={{ width: 180 }}
      allowClear={false}
      onChange={(e: any) => {
        widget?.setValue(e);
      }}
      {...(options?.options ?? {})}
    />
  );
}
