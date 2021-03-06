import React from 'react';
import PanelContent from './Content';
import { isEqual } from 'lodash';

import type { IWidgetProps } from '@antv/dipper-core';

export function PanelTabcontent(props: IWidgetProps) {
  return (
    <>
      {/** 头部表头 */}
      {/* <PanelHeader title={props.options.title} /> */}
      {/** 内容区域 */}
      <PanelContent {...props} />
    </>
  );
}

export default React.memo(PanelTabcontent, isEqual);
