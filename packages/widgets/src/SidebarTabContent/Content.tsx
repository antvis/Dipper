import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { AppTabsContent } from '@antv/dipper-component';
import type { IWidgetProps } from '@antv/dipper-core';

function SidebarTabContent(props: IWidgetProps<string>) {
  const { children = [] } = props;
  return (
    <div
      className={classnames({
        [styles.appSidebarContent]: true,
        [styles.appSidebarContentWithoutTabs]: children.length <= 1,
      })}
    >
      <AppTabsContent items={children || []} />
    </div>
  );
}

export default SidebarTabContent;
