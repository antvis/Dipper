import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { AppTabsContent } from '@/hooks';
import type { IWidgetProps } from '@antv/dipper-core';
import { isEqual } from 'lodash';

function PanelTabContent(props: IWidgetProps) {
  const { childrens = [] } = props;
  return (
    <div
      className={classnames({
        [styles.appPanelContent]: true,
        [styles.appPanelContentWithoutTabs]: childrens.length <= 1,
      })}
    >
      <AppTabsContent items={childrens || []} />
    </div>
  );
}

export default React.memo(PanelTabContent, isEqual);
