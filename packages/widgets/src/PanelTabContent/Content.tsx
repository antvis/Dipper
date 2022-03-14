import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { AppTabsContent } from '../TabsContent';
import type { IWidgetProps } from '@antv/dipper-core';
import { isEqual } from 'lodash';

function PanelTabContent(props: IWidgetProps) {
  const { components = [], widget } = props;

  return (
    <div
      className={classnames({
        [styles.appPanelContent]: true,
        [styles.appPanelContentWithoutTabs]: components.length <= 1,
      })}
    >
      <AppTabsContent
        items={components || []}
        onChange={(e) => {
          // @ts-ignore
          widget?.setValues(e);
        }}
      />
    </div>
  );
}

export default React.memo(PanelTabContent, isEqual);
