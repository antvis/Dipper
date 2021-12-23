import React from 'react';
import classnames from 'classnames';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';

export interface ILegendControlProps {
  title: string;
  items: {
    value: string;
    color: string;
  }[];
}

export function DiscreteColor({ options }: IWidgetProps) {
  const { title, items } = options as ILegendControlProps;
  return (
    <>
      {items.length && (
        <div className={classnames([styles.legendControl])}>
          <div className={styles.legendControlTitle}>{title}</div>
          {items.map((item) => (
            <div className={styles.legendControlItem} key={item.value}>
              <div
                className={styles.legendControlColor}
                style={{ backgroundColor: item.color }}
              />
              <div className={styles.legendControlName}>
                {Array.isArray(item.value)
                  ? item.value.join(' - ')
                  : item.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
