import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

interface ILegendItem {
  colors: string[];
  name: string;
}

interface IRangeGroup {
  type: 'range';
  items: ILegendItem[];
  valueList: number[];
}

export interface IRangeControlProps {
  group: IRangeGroup[];
  targetName?: string;
  labelWidth?: string | number;
}

export function DiscreteColor({
  group = [],
  targetName,
  labelWidth = 78,
}: IRangeControlProps) {
  return (
    <div className={classnames(['l7-control', 'l7-bar', styles.rangeControl])}>
      {group?.map((groupItem, groupIndex) => (
        <div className={styles.rangeControlGroup} key={groupIndex}>
          {groupItem.items.map((item, index) => (
            <div
              key={`${item.name}${index}`}
              className={styles.rangeControlItem}
            >
              <div
                className={styles.rangeControlLabel}
                style={{ width: labelWidth }}
              >
                {item.name}
              </div>
              <div className={styles.rangeControlBar}>
                {item.colors.map((color, colorIndex) => (
                  <div
                    className={styles.rangeControlBarItem}
                    style={{ backgroundColor: color }}
                    key={colorIndex}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className={styles.rangeControlItem}>
            <div
              className={styles.rangeControlLabel}
              style={{ width: labelWidth }}
            >
              {targetName ?? ''}
            </div>
            <div className={styles.rangeControlvalueList}>
              {groupItem.valueList.map((number, numberIndex) => {
                const style: React.CSSProperties = {
                  width: `${100 / groupItem.valueList.length}%`,
                  textAlign: 'center',
                };
                if (!numberIndex) {
                  style.textAlign = 'left';
                  style.width = `${
                    100 / (groupItem.valueList.length - 1) / 2
                  }%`;
                }
                if (numberIndex === groupItem.valueList.length - 1) {
                  style.textAlign = 'right';
                  style.width = `${
                    100 / (groupItem.valueList.length - 1) / 2
                  }%`;
                }
                return (
                  // @ts-ignore
                  <div style={style} key={`${numberIndex}${number}`}>
                    {number}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
