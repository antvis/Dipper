import React from 'react';
import { NavBar } from 'antd-mobile';
import { useConfigService } from '../../hooks';
import { isDisplay } from '../../util/ui';

export default function AppHeader() {
  const { globalConfig } = useConfigService();
  const { display, options } = globalConfig.headerbar || {};
  const { title } = options || {};

  return isDisplay(display) ? <NavBar back={null}>{title?.value}</NavBar> : <></>;
}
