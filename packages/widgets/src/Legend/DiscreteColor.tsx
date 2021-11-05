import React from 'react';
import type { IWidgetProps } from '@antv/dipper-core';
import './index.less';

export interface ILegendControlProps {
  targetName: string;
  items: {
    value: string;
    color: string;
  }[];
}

export function DiscreteColor({ options }: IWidgetProps<string>) {
  const { targetName, items } = options as ILegendControlProps;
  return (
    <>
      {items.length && (
        <div className="legendControl">
          <div className="legendControlTitle">{targetName}</div>
          {items.map((item) => (
            <div className="legendControlItem" key={item.value}>
              <div
                className="legendControlColor"
                style={{ backgroundColor: item.color }}
              />
              <div className="legendControlName">
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
