import { Empty, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import * as loadsh from 'lodash';
import { Amaps, AmapService } from '../service/amaps';
import { useConfigService } from '@antv/dipper-layout';

// 高德Pois 参数
export interface Pois {
  id: string;
  adcode: string;
  address: string;
  district: string;
  name: string;
  location: { lat: number; lng: number };
  typecode: string;
}

interface GeoMethods {
  serviceMethod?: string;
}

export function SearchPlace(params: GeoMethods) {
  const { serviceMethod = 'Autocomplete' } = params;
  const { setWidgetsOptions, setWidgetsValue } = useConfigService();
  const [pois, setPois] = useState<Pois[]>([]);
  const icon =
    'https://gw.alipayobjects.com/mdn/rms_58ab56/afts/img/A*sbq2TI9VDwYAAAAAAAAAAAAAARQnAQ';
  const [map, setMap] = useState<AmapService<Pois[]>>();

  useEffect(() => {
    const amaps = new Amaps<Pois[]>({
      serviceMethod,
    });
    setMap(amaps);
  }, []);

  const delayedChange = loadsh.debounce(async (searchKey: string) => {
    if (searchKey === '') return setPois([]);
    map?.searchPlaces(searchKey);
    // 延时取值 first result is undefined
    setTimeout(() => {
      const result = map?.getResult() as Pois[];
      if (result) {
        setPois(result);
      }
    }, 300);
  }, 500);

  const onSearchKey = (e: any) => delayedChange(e.target.value);

  // 选择地区
  const onSelectPlace = (item: Pois) => {
    // set search place
    setWidgetsValue('placeList', item);
    setWidgetsOptions('placeList', pois);
  };

  return (
    <>
      <Input
        placeholder="请输入要搜索的地区"
        onChange={onSearchKey}
        className={styles.input}
      />
      {Object.keys(pois).length ? (
        <div className={styles.placeContent}>
          {pois &&
            pois.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.poiList}
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
              );
            })}
        </div>
      ) : null}
    </>
  );
}
