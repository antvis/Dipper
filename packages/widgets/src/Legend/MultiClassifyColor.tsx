import React from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import styles from './index.less';

interface ILegendItem {
  colors: string[];
  values: number[];
  title: string;
}

export interface IMultiClassLegendProps {
  items: ILegendItem[];
  title?: string;
}

export function MultiClassifyColor({ options }: IWidgetProps) {
  const { items = [], title } = options as IMultiClassLegendProps;
  return (
    <div className={styles.legendClassifyControl}>
      {title ? <h4>{title}</h4> : null}
      {items.map((colorBar, index) => {
        return (
          <div style={{ marginBottom: 8 }}>
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
            <div className={styles.valueBar}>
              <span style={{ width: '50px' }}>{}</span>
              {colorBar.values.map((item, colorIndex) => (
                <span key={colorIndex} className={styles.value}>
                  {Array.isArray(item) ? item[0] : item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      {/* 数字 */}
    </div>
  );
}
