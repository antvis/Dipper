import { Empty, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less'
import * as loadsh from 'lodash'
import { Amaps, AmapService } from '../service/amaps';

// 高德Pios 参数
export interface Pios{
  id: string;
  adcode: string;
  address: string;
  district: string;
  name: string;
  location: { lat: number; lng: number };
  typecode: string;
}

interface GeoMethods{
  serviceMethod?: string
}

export function SearchPlace(params: GeoMethods) {
  const { serviceMethod = 'Autocomplete' } = params
  const [pois, setPois] = useState<Pios[]>([])
  const icon = 'https://gw.alipayobjects.com/mdn/rms_58ab56/afts/img/A*sbq2TI9VDwYAAAAAAAAAAAAAARQnAQ'
  const [map,setMap] = useState<AmapService<Pios[]>>()

  useEffect(()=>{
    const amaps = new Amaps<Pios[]>({
      serviceMethod
    })
    setMap(amaps)
  },[])


  const delayedChange = loadsh.debounce(async(searchKey: string) => {
    if (searchKey === '') return setPois([])
    map?.searchPlaces(searchKey)
    const res = map?.getResult()
    if (res) { setPois(res)}
  },500)

  const onSearchKey = (e: any) => delayedChange(e.target.value);

  // 选择地区
  const onSelectPlace = (item: Pios) => {
    console.log('item', item)
  }

  return (
    <>
      <Input placeholder="请输入要搜索的地区"
        onChange={onSearchKey}
        className={styles.input}
      />
      {Object.keys(pois).length
        ? <div className={styles.placeContent}>
          {pois && pois.map((item) => {
            return (
              <div key={item.id} className={styles.poiList}
                // @ts-ignore
                onClick={() => onSelectPlace(item)}
              >
                <div className={styles.list}>
                  <img src={icon} className={styles.marke} />
                  <div>
                    <div className={styles.desc}>{item.name}</div>
                    <div className={styles.desc}>{item.address}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        : null
      }

    </>
  )
}
