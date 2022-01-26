import { Select } from 'antd';
import React from 'react';
import { IWidgetProps } from '@antv/dipper-core';
import { useConfigService } from '@antv/dipper-layout';

export function DipperSelect({ type = 'dipperselect', options }: IWidgetProps) {
  const { setWidgetsValue } = useConfigService();
  return (
    <Select
      defaultValue={options?.defaultValue || ''}
      options={options?.options || []}
      bordered={false}
      style={{ width: 180 }}
      allowClear={false}
      onChange={(e: any) => {
        setWidgetsValue(type, e);
      }}
    />
  );
}
