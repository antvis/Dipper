import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { AppTabsContent } from '@antv/dipper-layout';
import type { IWidgetProps } from '@antv/dipper-core';
import { isEqual } from 'lodash';

function PanelTabContent(props: IWidgetProps) {
  const { subChildren = [] } = props;

  return (
    <div
      className={classnames({
        [styles.appPanelContent]: true,
        [styles.appPanelContentWithoutTabs]: subChildren.length <= 1,
      })}
    >
      <AppTabsContent items={subChildren || []} />
    </div>
  );
}

export default React.memo(PanelTabContent, isEqual);
