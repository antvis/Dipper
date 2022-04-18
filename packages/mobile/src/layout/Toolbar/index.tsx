import React from 'react';
import styles from './index.less';
import { LayoutContent } from '@antv/dipper-layout';
import type { IWidgetProps, IToolBar } from '@antv/dipper-core';
import { getWidgetChildren, isDisplay } from '@antv/dipper-core';

export default function MapToolbar({ toolbars }: { toolbars: IToolBar[] | IToolBar }) {
  const bars = Array.isArray(toolbars) ? toolbars : [toolbars];

  // TODO 根据配置
  return (
    <>
      {bars?.map((i, index) =>
        isDisplay(i?.display) ? (
          <div className={styles.appToolbar} key={index}>
            <LayoutContent items={getWidgetChildren(i as IWidgetProps)} />
          </div>
        ) : null,
      )}
    </>
  );
}
