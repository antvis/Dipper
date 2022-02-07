import { Cascader } from 'antd';
import React, { useEffect, useMemo } from 'react';
import 'antd/dist/antd.css';
import { IWidgetProps } from '@antv/dipper-core';
import { useConfigService, useWidgets } from '@antv/dipper-layout';

export function CitySelect({ id, type = 'CitySelect', options }: IWidgetProps) {
  const { setWidgetsValue } = useConfigService();
  const { widget } = useWidgets(id || type);
  useEffect(() => {
    widget?.setValues(
      options?.defaultValue || options?.options?.[0]?.value || '',
    );
  }, [widget]);

  return (
    <Cascader
      defaultValue={options?.defaultValue || []}
      style={{ width: 180 }}
      bordered={false}
      options={options?.options || []}
      allowClear={false}
      onChange={(e: any) => {
        setWidgetsValue(type, e);
      }}
      placeholder="选择城市"
    />
  );
}
