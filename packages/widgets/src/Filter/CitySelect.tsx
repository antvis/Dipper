import { Cascader } from 'antd';
import React, { useEffect, useMemo } from 'react';
import 'antd/dist/antd.css';
import { IWidgetProps } from '@antv/dipper-core';

export function CitySelect({
  id,
  type = 'CitySelect',
  options,
  widget,
}: IWidgetProps) {
  return (
    <Cascader
      defaultValue={widget?.getValue() as Array<any>}
      style={{ width: 180 }}
      bordered={false}
      options={(widget?.getOptions().options?.optionsData as Array<any>) || []}
      allowClear={false}
      onChange={(e: any) => {
        widget?.setValues(e);
      }}
      placeholder="选择城市"
    />
  );
}
