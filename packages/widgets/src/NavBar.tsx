import { Menu } from 'antd';
import React, { useMemo } from 'react';
import 'antd/dist/antd.css';
import type { IConfig } from '@antv/dipper-core';
import { findItem } from './Layout/utils';

interface NavBarProps {
  headerBar?: IConfig['headerBar'];
  viewData?: {
    global?: {
      view?: string;
    };
  };
}

export function NavBar({ headerBar, viewData }: NavBarProps) {
  const options = useMemo(() => {
    if (headerBar) {
      return findItem(headerBar, 'center')?.options || [];
    }
    return [];
  }, [headerBar]);

  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={[viewData?.global?.view || '']}
      style={{ width: '400px' }}
      onClick={(e) => {
        // console.info('您点击了', e);
      }}
    >
      {options.map((c: any) => {
        return <Menu.Item key={c.value}>{c.label}</Menu.Item>;
      })}
    </Menu>
  );
}
