import React, { useState } from 'react';
import { useConfigService } from '@antv/dipper-layout'
import { Button, message } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.less'
import { PointLayer } from '@antv/l7-react';

interface LocationProps{
  longitude: number;
  latitude: number;
  address: string
}

export function Location() {
  const [lnglat, setLnglat] = useState<LocationProps>()
  const [loading,setLoading] = useState(false)
  const { setConfig } = useConfigService();

  // 按需加载高德
  const gdMapLoad = () => {
    return new Promise<any>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://webapi.amap.com/maps?v=1.4.15&key=f49a4a0f692f6a5a9c00457c89f86332&plugin=AMap.Geolocation';
      script.onerror = reject;
      document.head.appendChild(script);
      script.onload = () => {
        resolve(window.AMap);
      };
    });
  };

  // 高德定位
  const gdLocation = async () => {
    const AMap = await gdMapLoad();
    return new Promise((resolve, reject) => {
      const geolocation = new AMap.Geolocation();
      geolocation.getCurrentPosition((status: any, result: any) => {
        if (status === 'complete') {
          resolve({
            longitude: result.position.getLng(),
            latitude: result.position.getLat(),
            address: result.formattedAddress || '未知地区'
          });
        } else {
          reject(result);
        }
      });
    });
  };

  // 校验经纬度
  function verifyLocation(location: any = {}) {
    const { longitude, latitude } = location
    if (typeof longitude === 'undefined' || typeof latitude === 'undefined') {
      return false;
    }
    if (Number(longitude) === 0 && Number(latitude) === 0) {
      return false;
    }
    return true;
  }

  // 获取位置坐标
  const setLocation = async () => {
    setLoading(true)
    let location: any;
    try {
      location = await gdLocation() as LocationProps;
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error('定位失败')
      console.error('【定位失败', error);
    }
    if (!verifyLocation(location)) {
      console.error('【定位失败');
    }
    if (location && Object.keys(location as {}).length) {
      // 更新当前坐标为可见区域中心点
      setConfig('map.center',[location.longitude,location.latitude])
    }
    setLnglat(location)
  }


  return (
    <>
      <Button size='small'
        loading={loading}
        type='default' icon={<AimOutlined />}
        className={styles.locationBtn}
        onClick={setLocation}
      />
      {lnglat && Object.keys(lnglat).length ? <PointLayer
        options={{
          zIndex: 100
        }}
        source={{
          data: [{
            longitude: lnglat.longitude,
            latitude: lnglat.latitude,
            name: lnglat.address,
          }],
          // @ts-ignore
          parser: {
            type: 'json',
            x: 'longitude',
            y: 'latitude',
          }
        }}
        color={{
          values:'#3483F7'
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
          stroke:'#e2e2e2'
        }}
      /> : null}
    </>
  )
}
