import React from 'react';
import PanelHeader from './PanelHeader';
import PanelContent from './Content';
import { config } from './config';
import type { IWidgetProps } from '@antv/dipper-core';
import { useConfigService } from '@antv/dipper-component';

export function SiderBar(props: IWidgetProps<string>) {
  const { globalConfig } = useConfigService<any>();
  return (
    <>
      {/** 头部表头 */}
      {/* <PanelHeader title={config.title} /> */}
      {/** 内容区域 */}
      <PanelContent {...props} />
    </>
  );
}
