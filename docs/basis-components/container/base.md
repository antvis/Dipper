---
title: 容器组件
order: 1
toc: content
mobile: false
group:
  title: 容器组件
---

### 容器组件 DipperContainerContext

容器组件与模版一一对应，容器组件是模版的顶级组件，容器组件详见各模版。PC 端默认的容器组件配置如下：

<!-- 容器组件，初始 Dipper 实例 -->

<!-- ```tsx
/**
 *
 * defaultShowCode: true
 */
import { DipperContainerContext } from '@antv/dipper-layout';
import React from 'react';
export default () => {
  return (
    <DipperContainerContext cfg={{}}>
      <h1>容器测试</h1>
    </DipperContainerContext>
  );
};
``` -->

<API hideTitle src='@antv/dipper-layout/src/layout/Container/Context.tsx'></API>

<!-- ### 地图组件

### 使用地图组件 -->

<!-- ```tsx
/**
 *
 * defaultShowCode: true
 */
import React from 'react';
import { DipperContainerContext, MapContainer } from '@antv/dipper';

export default () => {
  return (
    <DipperContainerContext
      cfg={{
        map: {
          mapStyle: 'dark',
        },
      }}
    >
      <div style={{ height: '300px' }}>{MapContainer && <MapContainer />}</div>
    </DipperContainerContext>
  );
};
``` -->

<!-- <API hideTitle src='@antv/dipper-layout/src/layout/Map/index.tsx'></API> -->

<!-- #### 组件容器 -->
