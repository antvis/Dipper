import React from 'react';
import { NavBar } from 'antd-mobile';
import { isDisplay, useConfigService } from '@antv/dipper-layout-base';

export function MobileHeader() {
  const { globalConfig } = useConfigService();
  const { display, options } = globalConfig.headerbar || {};
  const { title } = options || {};

  return isDisplay(display) ? <NavBar back={null}>{title?.value}</NavBar> : <></>;
}
