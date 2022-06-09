import React from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';

interface ILegendItem {
  color: string;
  value: number | number[];
}

export interface IRangeControlProps {
  items: ILegendItem[];
  title?: string;
}

export function ClassifyColor({ options }: IWidgetProps) {
  const { items, title } = options as IRangeControlProps;
  return (
    <div className={styles.legendClassifyControl}>
      <h4>{title}</h4>
      <div className={styles.colorBar}>
        {items.map((item, colorIndex) => (
          <span
            key={`${colorIndex}`}
            className={styles.color}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
      <div className={styles.valueBar}>
        {items.map((item, colorIndex) => (
          <span key={`${colorIndex}`} className={styles.value}>
            {Array.isArray(item.value) ? item.value[0] : item.value}
          </span>
        ))}
        {/* 分组类型 */}
        {items.length > 1 && Array.isArray(items[items.length - 1]?.value) && (
          <span>{(items[items.length - 1]?.value as number[])[1]}</span>
        )}
      </div>
    </div>
  );
}
