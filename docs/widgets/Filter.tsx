import { Cascader } from "antd";
import React from "react";
import 'antd/dist/antd.css'
import { useConfigService } from '@antv/dipper';


export function AppFilter() {
  const { globalConfig } = useConfigService();
  const { initData } = globalConfig;
  return (
    <>
      <Cascader defaultValue={['130000', '130200']}
        style={{ width: 180 }}
        options={initData.areaVOList}
        allowClear={false}
        onChange={(e) => {
          console.log(e)
        }}
        placeholder="选择城市"
      />
    </>
  );
}
