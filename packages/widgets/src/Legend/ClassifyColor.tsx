import React from 'react';
import classnames from 'classnames';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';

interface ILegendItem {
  color: string;
  value: number | number[];
}

export interface IRangeControlProps {
  items: ILegendItem[];
  targetName?: string;
  labelWidth?: string | number;
}

export function ClassifyColor({ options }: IWidgetProps<string>) {
  const { items, labelWidth = 100, targetName } = options as IRangeControlProps;
  console.log(items);

  return (
    <div className={styles.legendClassifyControl}>
      <h4>{targetName}</h4>
      <div className={styles.colorBar}>
        {items.map((item, colorIndex) => (
          <span
            className={styles.color}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
      <div className={styles.valueBar}>
        {items.map((item, colorIndex) => (
          <span className={styles.value}>
            {Math.floor(Array.isArray(item.value) ? item.value[0] : item.value)}
          </span>
        ))}
        {Array.isArray(items[items.length - 1].value) && (
          <span>{(items[items.length - 1].value as number[])[1]}</span>
        )}
      </div>
    </div>
    // </div>
  );
}
