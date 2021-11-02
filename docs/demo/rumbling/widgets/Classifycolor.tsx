import React, { useMemo } from 'react';
import 'antd/dist/antd.css';
import { useConfigService,ClassifyColor } from "@antv/dipper"

export interface ILegendControlProps<T> {
  targetName: string;
  items: T;
}

type Items = Array<{ label: string; color: string }>;

export const Legends = () => {
  const { globalConfig } = useConfigService();
  const { legends } = globalConfig;

  const legend: ILegendControlProps<Items> = useMemo(() => {
    if (legends) {
      return legends.find((item) => item.type === "classifycolor").options;
    }

  }, [legends]);

  console.log('legend',legend)

  return <ClassifyColor options={legend}/>
}
