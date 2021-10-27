import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './Content';
import { config } from './config';
import type { IWidgetProps } from '@antv/dipper-core';
import { useConfigService } from '@antv/dipper-component';

export function SiderBar(props: IWidgetProps<string>) {
  const { globalConfig } = useConfigService<any>();

  const canvasId = globalConfig?.initData?.mapId;
  return canvasId ? (
    <>
      {/** 头部表头 */}
      <SidebarHeader title={config.title} />
      {/** 内容区域 */}
      <SidebarContent {...props} />
    </>
  ) : (
    <></>
  );
}
