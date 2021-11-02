import React from 'react';
import classnames from 'classnames';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';

export interface ILegendControlProps {
  targetName: string;
  items: {
    label: string;
    color: string;
  }[];
}

export function ClassifyColor({ options }: IWidgetProps<string>) {

  const { targetName, items } = options as ILegendControlProps;
  return (
    <>
      {items.length && (
        <div className={classnames(['l7-bar', styles.legendControl])}>
          <div className={styles.legendControlTitle}>{targetName}</div>
          {items.map((item) => (
            <div className={styles.legendControlItem} key={item.label}>
              <div
                className={styles.legendControlColor}
                style={{ backgroundColor: item.color }}
              />
              <div className={styles.legendControlName}>{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
