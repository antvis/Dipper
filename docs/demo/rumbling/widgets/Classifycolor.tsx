import React, { useMemo } from 'react';
import 'antd/dist/antd.css';
import { useConfigService } from "@antv/dipper"
import styles from '../styles/classifycolor.less'


export interface ILegendControlProps<T> {
  targetName: string;
  items: T
}

type Items = Array<{ label: string; color: string }>

export const ClassifyColor = () => {
  const { globalConfig } = useConfigService();
  console.log('globalConfig', globalConfig)
  const { legends } = globalConfig

  const legend: ILegendControlProps<Items> = useMemo(() => {
    return legends.find((item) => item.type === "classifycolor").options;
  }, [legends]);

  return (
    <div className={styles.legendControl}>
      <div>{legend.targetName}</div>
      {legend.items && legend.items.map((item) => {
        return (
          <div key={item.label} className={styles.legendContainer}>
            <div className={styles.legendColorBlock} style={{ backgroundColor: item.color }} />
            <div>{item.label}</div>
          </div>
        )
      })}
    </div>
  )
}
