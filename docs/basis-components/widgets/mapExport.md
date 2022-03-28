---
title: 地图导出
toc: content
order: 2
mobile: false
group:
  title: 地图组件
---

## 地图导出组件 exportMap

目前支持将当前地图导出为图片

配项

```ts
{
    display: true,
    position: 'topleft',
    type: 'exportMap',
    title: '地图导出',
}
```

```tsx
import React, { useEffect, useState } from 'react';
import { LineLayer } from '@antv/l7-react'
import {
  DipperContainer,
  registerWidget,
  useConfigService,
} from '@antv/dipper';
import { Select } from 'antd';
const { Option } = Select;

export default function RumbMap() {
 const [data,setData] = useState()
  useEffect(()=>{
    fetch('https://gw.alipayobjects.com/os/rmsportal/UEXQMifxtkQlYfChpPwT.txt')
    .then(res => res.text())
    .then(data => {
        setData(data)
    })
    },[])
  return (
    <div style={{ height: '500px' }}>
     {data &&  <DipperContainer
       onLoad={(container)=>{
           console.log(container)
       }}
        cfg={{
          map:{
            style: 'dark',
            pitch: 0,
            center: [ 107.77791556935472, 35.443286920228644 ],
            zoom: 2.9142882493605033
          },
          controls: [
            {
              display: true,
              position: 'topleft',
              type: 'exportMap',
              title: '地图导出',
            }
          ],
        }}
      >
     <LineLayer
         source={{
              data,
          parser: {
            type: 'csv',
            x: 'lng1',
            y: 'lat1',
            x1: 'lng2',
            y1: 'lat2'
          }

            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#8C1EB2', // 描边颜色
            }}
            shape={{
              values: 'arc',
            }}
            style={{
              opacity: 1,
            }}/>
      }
    </DipperContainer>
    }
    </div>
  );
}
```
