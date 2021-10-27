import React, { useMemo } from 'react';
import { Cascader } from 'antd';
import styles from './index.less';
import { useConfigService } from '@antv/dipper-component';
import { findSelectArray, updateQueryStringParameter } from './common';
import { config } from './config';

export default function AppFilter() {
  const { globalConfig } = useConfigService<any>();
  const cityTreeData = useMemo<any[]>(() => {
    if (
      config.data.from === 'initData' &&
      globalConfig?.initData?.[config.data.field]
    ) {
      return globalConfig?.initData?.[config.data.field];
    }

    return [];
  }, [globalConfig?.initData?.[config.data.field]]);
  const defaultSelect = useMemo(() => {
    const cityCode = globalConfig?.initData?.areaCode;
    return findSelectArray(cityTreeData, cityCode);
  }, [cityTreeData]);

  return (
    <>
      {cityTreeData.length !== 0 && (
        <Cascader
          style={{
            width: 180,
          }}
          allowClear={false}
          className={styles.citySelect}
          options={cityTreeData}
          bordered={false}
          defaultValue={defaultSelect}
          onChange={(e) => {
            // 更新城市
            window.location.href = updateQueryStringParameter(
              window.location.href,
              'areaCode',
              e[1] as string,
            );
          }}
          placeholder="选择城市"
        />
      )}
    </>
  );
}
