import React, { useMemo } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';
import { Dropdown, Menu, Radio, Space } from 'antd';
import { useConfigService } from '@antv/dipper-layout';
import { Config } from './config';

export interface IMapStyleOption {}

export const MapStyle = () => {
  const { setConfig } = useConfigService();

  // 切换地图样式
  const clickStype = (e: any) => {
    setConfig('map.style', e.target.value);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Radio.Group
          onChange={clickStype}
          defaultValue={Config.options[0]?.value}
        >
          <Space direction="vertical">
            {Config.options &&
              Config.options.map((item: any) => {
                return (
                  <Radio value={item.value} key={item.value}>
                    {item.label}
                  </Radio>
                );
              })}
          </Space>
        </Radio.Group>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} className={styles.mapStyleButton}>
        <img src={Config.icon} title={Config.title}></img>
      </Dropdown>
    </>
  );
};
