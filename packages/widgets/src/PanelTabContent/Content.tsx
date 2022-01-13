import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import type { IWidgetProps } from '@antv/dipper-core';
import { isEqual } from 'lodash';
import { AppTabsContent } from '../Layout/AppTemplate';

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
