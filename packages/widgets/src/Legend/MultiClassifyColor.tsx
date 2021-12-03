import React from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';

interface ILegendItem {
  colors: string[];
  title: string;
}

export interface IMultiClassLegendProps {
  items: ILegendItem[];
  title?: string;
  values: Array<number | [number, number]>;
}

export function MultiClassifyColor({ options }: IWidgetProps<string>) {
  const { values, items, title } = options as IMultiClassLegendProps;
  return (
    <div className={styles.legendClassifyControl}>
      <h4>{title}</h4>
      {items.map((colorBar, index) => {
        return (
          <div key={'key' + index} style={{ display: 'flex' }}>
            <span style={{ width: '50px' }}>{colorBar.title}</span>
            <div className={styles.colorBar}>
              {colorBar.colors.map((item, colorIndex) => {
                return (
                  <span
                    key={colorIndex}
                    className={styles.color}
                    style={{ backgroundColor: item }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      {/* 数字 */}
      <div className={styles.valueBar}>
        <span style={{ width: '50px' }}>{}</span>
        {values.map((item, colorIndex) => (
          <span key={colorIndex} className={styles.value}>
            {Array.isArray(item) ? item[0] : item}
          </span>
        ))}
        {Array.isArray(values[0]) && (
          <span>{(values[values.length - 1] as number[])[1]}</span>
        )}
      </div>
    </div>
  );
}
