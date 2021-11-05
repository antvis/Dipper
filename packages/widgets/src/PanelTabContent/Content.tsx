import React from 'react';
import classnames from 'classnames';
import './index.less';
import { AppTabsContent } from '@antv/dipper-layout';
import type { IWidgetProps } from '@antv/dipper-core';

function PanelTabContent(props: IWidgetProps<string>) {
  const { children = [] } = props;
  return (
    <div
      className={classnames({
        appPanelContent: true,
        appPanelContentWithoutTabs: children.length <= 1,
      })}
    >
      <AppTabsContent items={children || []} />
    </div>
  );
}

export default PanelTabContent;
