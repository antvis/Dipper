import React from 'react';
import PanelContent from './Content';
import { isEqual } from 'lodash';

import type { IWidgetProps } from '@antv/dipper-core';

export function panelTabcontent(props: IWidgetProps<string>) {
  return (
    <>
      {/** 头部表头 */}
      {/* <PanelHeader title={config.title} /> */}
      {/** 内容区域 */}
      <PanelContent {...props} />
    </>
  );
}

export const PanelTabcontent = panelTabcontent;
// = React.memo(panelTabcontent,isEqual)
