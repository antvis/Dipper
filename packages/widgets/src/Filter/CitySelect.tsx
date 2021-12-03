import { Cascader } from 'antd';
import type { CascaderOptionType } from 'antd/es/cascader/index';
import React, { useMemo } from 'react';
import 'antd/dist/antd.css';
import { IWidgetProps } from '@antv/dipper-core';
import { useConfigService } from '@antv/dipper-layout';
import { findSelectArray } from './common';

export function CitySelect({ type = 'CitySelect' }: IWidgetProps<string>) {
  const { globalConfig, getWidgetsOptions, setWidgetsValue } =
    useConfigService();
  const defaultSelect = useMemo(() => {
    const cityCode = (globalConfig?.viewData?.global?.areaCode as string) || '';
    return findSelectArray(getWidgetsOptions(type) as any[], cityCode);
  }, [getWidgetsOptions(type)]);

  return (
    <>
      <Cascader
        defaultValue={defaultSelect}
        style={{ width: 180 }}
        bordered={false}
        options={getWidgetsOptions(type) as CascaderOptionType[]}
        allowClear={false}
        onChange={(e) => {
          setWidgetsValue(type, e);
        }}
        placeholder="选择城市"
      />
    </>
  );
}
