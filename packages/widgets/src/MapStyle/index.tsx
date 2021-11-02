import React, { useMemo } from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Radio, Space } from 'antd';
import { useConfigService } from '@antv/dipper-component';

type Items = Array<{ label: string; value: string }>;

export const MapStyle = () => {
  const { globalConfig, setConfig } = useConfigService();
  const { controls = [] } = globalConfig;

  const styleOption: IWidgetProps<Items> = useMemo(() => {
    if (controls) {
      return controls.find(
        (item: IWidgetProps<any>) => item.type === 'mapStyle',
      )?.options;
    }
  }, [controls]);

  // 切换地图样式
  const clickStype = (e: any) => {
    setConfig('map.style', e.target.value);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Radio.Group onChange={clickStype}>
          <Space direction="vertical">
            {styleOption &&
              styleOption.map((item: any) => {
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
        <MenuOutlined />
      </Dropdown>
    </>
  );
};
