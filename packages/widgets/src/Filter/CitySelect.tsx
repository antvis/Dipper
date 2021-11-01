import { Cascader } from 'antd';
import type { CascaderOptionType } from 'antd/es/cascader/index';
import React from 'react';
import 'antd/dist/antd.css';
import { useConfigService } from '@antv/dipper-component';

export function CitySelect() {
  const { globalConfig, getWidgetsOptions } = useConfigService();
  const { viewData } = globalConfig;
  return (
    <>
      <Cascader
        defaultValue={['330000', '330100']}
        style={{ width: 180 }}
        bordered={false}
        options={getWidgetsOptions('citySelect') as CascaderOptionType[]}
        allowClear={false}
        onChange={(e) => {
          console.log(e);
        }}
        placeholder="选择城市"
      />
    </>
  );
}
