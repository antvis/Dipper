import { Cascader } from 'antd';
import React, { useMemo } from 'react';
import 'antd/dist/antd.css';
import { IWidgetProps } from '@antv/dipper-core';
import { useConfigService } from '@antv/dipper-layout';
import { findSelectArray } from './common';

export function CitySelect({ type = 'CitySelect', options }: IWidgetProps) {
  const { globalConfig, getWidgetsOptions, setWidgetsValue } =
    useConfigService();
  // const defaultSelect = useMemo(() => {
  //   const cityCode = (globalConfig?.viewData?.global?.areaCode as string) || '';
  //   console.log(type, getWidgetsOptions(type))
  //   return findSelectArray(getWidgetsOptions(type) as any[], cityCode);
  // }, [getWidgetsOptions(type)]);

  return (
    <>
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
    </>
  );
}
