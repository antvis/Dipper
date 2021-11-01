import { initWidgets } from "./widgets";
import React, { useEffect,useState } from 'react';
import { config } from './configs/config';
import { DipperContainer, IConfig } from '@antv/dipper';

interface IInitData {
  areaVOList: any[];
  sceneCode: string;
  areaCode: string;
  filterData: any[];
}


export default function RumbMap() {
  const [mapConfig, setMapConfig] = useState<IConfig<IInitData>>();
  useEffect(()=>{
    initWidgets()
    setMapConfig(config)
  },[])

  return (
    <div style={{ height:'1000px'}}>
      <DipperContainer<IInitData> cfg={mapConfig!} />
    </div>
  )
}
