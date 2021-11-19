import { Cascader } from 'antd';
import type { CascaderOptionType } from 'antd/es/cascader/index';
import React from 'react';
import 'antd/dist/antd.css';
import { useConfigService } from '@antv/dipper-layout';

export function CitySelect() {
  const { globalConfig, getWidgetsOptions, getWidgetsValue, setWidgetsValue } =
    useConfigService();
  const { viewData } = globalConfig;
  return (
    <>
      <Cascader
        defaultValue={
          (getWidgetsValue('citySelect') as number[]) || ['330000', '330100']
        }
        style={{ width: 180 }}
        bordered={false}
        options={getWidgetsOptions('citySelect') as CascaderOptionType[]}
        allowClear={false}
        onChange={(e) => {
          setWidgetsValue('citySelect', e);
        }}
        placeholder="选择城市"
      />
    </>
  );
}
