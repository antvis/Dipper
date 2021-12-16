import { Button, Empty, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import * as loadsh from 'lodash';
import { Amaps, AmapService } from '../service/amaps';
import { useConfigService } from '@antv/dipper-layout';
import { SearchOutlined } from '@ant-design/icons';

// 高德Pios 参数
export interface Pios {
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
  const [pois, setPois] = useState<Pios[]>([]);
  const icon =
    'https://gw.alipayobjects.com/mdn/rms_58ab56/afts/img/A*sbq2TI9VDwYAAAAAAAAAAAAAARQnAQ';
  const searchicon =
    'https://gw.alipayobjects.com/zos/bmw-prod/6ef4a129-f477-49e2-b493-24d66b3b3c22.svg';
  const [map, setMap] = useState<AmapService<Pios[]>>();
  const [inputShow, setInputShow] = useState(false);

  useEffect(() => {
    const amaps = new Amaps<Pios[]>({
      serviceMethod,
    });
    setMap(amaps);
  }, []);

  const delayedChange = loadsh.debounce(async (searchKey: string) => {
    if (searchKey === '') return setPois([]);
    map?.searchPlaces(searchKey);
    // 延时取值 first result is undefined
    setTimeout(() => {
      const result = map?.getResult() as Pios[];
      if (result) {
        setPois(result);
      }
    }, 300);
  }, 500);

  const onSearchKey = (e: any) => delayedChange(e.target.value);

  // 选择地区
  const onSelectPlace = (item: Pios) => {
    // set search place
    setWidgetsValue('placeList', item);
    setWidgetsOptions('placeList', pois);
  };

  return (
    <div className={styles.searchlist}>
      <div style={{ display: 'flex' }}>
        <Button
          icon={<img src={searchicon} />}
          onClick={() => setInputShow(!inputShow)}
        />
        {inputShow && (
          <Input
            placeholder="请输入要搜索的地区"
            onChange={onSearchKey}
            className={styles.input}
          />
        )}
      </div>
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
    </div>
  );
}
