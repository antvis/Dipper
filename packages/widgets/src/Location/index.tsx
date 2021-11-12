import React, { useState, useEffect } from 'react';
import { useConfigService } from '@antv/dipper-layout';
import { Button, message } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.less';
import { PointLayer } from '@antv/l7-react';
import { Amaps, AmapService } from '../service/amaps';
interface Locations {
  longitude: number;
  latitude: number;
  address: string;
}

export function Location() {
  const [lnglat, setLnglat] = useState<Locations>();
  const [loading, setLoading] = useState(false);
  const { setConfig } = useConfigService();
  const [map, setMap] = useState<AmapService<Locations>>();

  useEffect(() => {
    const amaps = new Amaps<Locations>({
      serviceMethod: 'Geolocation',
    });
    setMap(amaps);
  }, []);

  // 获取位置坐标
  const setLocation = async () => {
    setLoading(true);
    map?.gdLocation();
    setTimeout(() => {
      const res = map?.getResult();
      if (res) {
        setConfig('map.center', [res.longitude, res.latitude]);
        setLnglat(res);
      }
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <Button
        size="small"
        loading={loading}
        type="default"
        icon={<AimOutlined />}
        className={styles.locationBtn}
        onClick={setLocation}
      />
      {lnglat && Object.keys(lnglat).length ? (
        <PointLayer
          options={{
            zIndex: 100,
          }}
          source={{
            data: [
              {
                longitude: lnglat.longitude,
                latitude: lnglat.latitude,
                name: lnglat.address,
              },
            ],
            // @ts-ignore
            parser: {
              type: 'json',
              x: 'longitude',
              y: 'latitude',
            },
          }}
          color={{
            values: '#3483F7',
          }}
          shape={{
            field: 'circle',
          }}
          size={{
            values: 7,
          }}
          style={{
            opacity: 1,
            strokeWidth: 4,
            stroke: '#e2e2e2',
          }}
        />
      ) : null}
    </>
  );
}
