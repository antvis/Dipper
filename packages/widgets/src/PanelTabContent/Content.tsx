import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { AppTabsContent } from '@antv/dipper-layout';
import type { IWidgetProps } from '@antv/dipper-core';
import { isEqual } from 'lodash';

function PanelTabContent(props: IWidgetProps<string>) {
  const { children = [] } = props;
  return (
    <div
      className={classnames({
        [styles.appPanelContent]: true,
        [styles.appPanelContentWithoutTabs]: children.length <= 1,
      })}
    >
      <AppTabsContent items={children || []} />
    </div>
  );
}

export default React.memo(PanelTabContent, isEqual);
