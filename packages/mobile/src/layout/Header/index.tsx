import React from 'react';
import styles from './index.less';
import { useConfigService, CustomBaseLayout } from '@antv/dipper-layout';
import { getWidgetChildren, IWidgetProps, isDisplay } from '@antv/dipper-core';

import { NavBar } from 'antd-mobile';
export default function AppHeader() {
  const { globalConfig } = useConfigService();
  const { display, options } = globalConfig.headerbar || {};
  const components = getWidgetChildren(globalConfig.headerbar);
  const { headerstyle, logo, title } = options || {};

  return isDisplay(display) ? <NavBar back={null}>{title?.value}</NavBar> : <></>;
}
