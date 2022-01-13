import React, { useState } from 'react';
import styles from './index.less';
import { Dropdown, Menu } from 'antd';
import { Config } from './config';
import { useConfigService } from '../Layout/hooks';

export interface IMapStyleOption {}

export const MapStyle = () => {
  const { setConfig } = useConfigService();
  const [current, setCurrent] = useState(Config.options[0]?.value);

  // 切换地图样式
  const clickStype = (value: string) => {
    setCurrent(value);
    setConfig('map.style', value);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div className={styles.mapStyle}>
          {Config.options &&
            Config.options.map((item: any) => {
              return (
                <div
                  key={item.value}
                  className={styles.mapStyleCard}
                  onClick={() => clickStype(item.value)}
                  style={{
                    border:
                      item.value === current ? '3px solid #1890ff' : 'none',
                  }}
                >
                  <img src={item.img} className={styles.mapImg} />
                  <span>{item.label}</span>
                </div>
              );
            })}
        </div>
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
