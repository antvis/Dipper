import { Cascader } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import { useConfigService } from '@antv/dipper';

export function AppFilter() {
  const { globalConfig } = useConfigService();
  const { viewData } = globalConfig;
  return (
    <>
      <Cascader
        defaultValue={['330000', '330100']}
        style={{ width: 180 }}
        bordered={false}
        options={viewData.areaVOList}
        allowClear={false}
        onChange={(e) => {
          console.log(e);
        }}
        placeholder="选择城市"
      />
    </>
  );
}
