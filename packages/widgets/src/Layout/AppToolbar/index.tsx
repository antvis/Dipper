import React from 'react';
import styles from './index.less';
import { isDisplay } from '../utils/ui';
import { getWidget, IConfig } from '@antv/dipper-core';
import { BaseLayoutComp } from '../BaseLayoutComp';
import { CustomBaseWidgets } from '../../BaseWidget/widget';

export default function AppToolbar(props: IConfig['toolbar']) {
  const { display = true } = props || {};

  return (
    <BaseLayoutComp {...props} type="toolbar">
      {isDisplay(display) ? (
        <div className={styles.appToolbar}>
          {props.subChildren.map((child, index) => (
            <CustomBaseWidgets {...child} type={child.type} key={index}>
              {getWidget(child.type)(child)}
            </CustomBaseWidgets>
          ))}
        </div>
      ) : null}
    </BaseLayoutComp>
  );
}
