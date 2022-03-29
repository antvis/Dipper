import React from 'react';
import styles from './index.less';
import { useConfigService, CustomBaseLayout } from '@antv/dipper-layout';
import { getWidgetChildren, IWidgetProps, isDisplay } from '@antv/dipper-core';

import { NavBar } from 'antd-mobile';
export default function AppHeader() {
  const { globalConfig } = useConfigService();
  const { display, options } = globalConfig.headerbar || {};
  const { title } = options || {};

  return isDisplay(display) ? <NavBar back={null}>{title?.value}</NavBar> : <></>;
}
