import { Menu } from 'antd';
import React, { useMemo } from 'react';
import 'antd/dist/antd.css';
import { useConfigService, findItem } from '@antv/dipper-component';
import { IWidgetProps } from '../../core/dist';

export function NavBar() {
  const { globalConfig } = useConfigService();
  const { headerbar, viewData } = globalConfig;

  const options = useMemo(() => {
    if (headerbar) {
      //@ts-ignore
      return findItem(headerbar, 'center')?.options;
    }
    return [];
  }, [headerbar]);
  console.log(viewData?.global.view);
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={[viewData?.global.view]}
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
