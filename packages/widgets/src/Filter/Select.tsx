import { Select } from 'antd';
import React, { useEffect } from 'react';
import { IWidgetProps } from '@antv/dipper-core';
import { useWidgets } from '@antv/dipper-layout';

export function DipperSelect({ id, type = 'select', options }: IWidgetProps) {
  const { widget } = useWidgets(id || type);
  console.log(id);
  useEffect(() => {
    widget?.setValues(
      options?.defaultValue || options?.options?.[0]?.value || '',
    );
  }, []);

  return (
    <Select
      defaultValue={options?.defaultValue || options?.options?.[0]?.value || ''}
      options={options?.options || []}
      bordered={false}
      style={{ width: 180 }}
      allowClear={false}
      onChange={(e: any) => {
        widget?.setValues(e);
      }}
    />
  );
}
