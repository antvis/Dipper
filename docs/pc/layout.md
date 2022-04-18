---
title: 布局
order: 1
toc: content
mobile: false
nav:
  title: PC 端
  order: 5
---

### 布局

Dipper 目前 PC 端规范了一套默认的布局模式，组织和规范各个组件的交互联动

![Dipper 应用布局](https://gw.alipayobjects.com/mdn/rms_08cc33/afts/img/A*coZJR4sZs9gAAAAAAAAAAAAAARQnAQ)

```tsx
/**
 *
 * defaultShowCode: true
 */
import React, { useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
} from '@antv/dipper';

export default function DipperMap() {
  return (
    <div style={{ height: '300px' }}>
      <DipperContainer
        cfg={{
          map:{
            style:'light'
          },
          controls: [
            {
              display: true,
              position: 'topleft',
              type: 'mapStyle',
              title: '地图样式',
            },
          ],
        }}
      />
    </div>
  );
}
```

<API hideTitle src='@antv/dipper-pc/src/layout/Container/index.tsx'></API>

## headerbar

头部导航配置、支持设置 Logo、Title、子组件

![导航条](https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*xs_VQpVoDWgAAAAAAAAAAAAAARQnAQ)

```ts
 {
    display?: boolean;
    headerstyle?: React.CSSProperties;
    url:string; // 点击导航回到首页

    logo: Partial<{
      display: boolean;
      value: string;
      style: React.CSSProperties;
      href: string;
    }>;
    title: Partial<{
      value: string;
      display: boolean;
      style: React.CSSProperties;
    }>;
    childrens?: IWidgetProps[];
 }
```

## toolBar

二级工具条,用于放置地图交互工具，可选

```ts
{
  display: boolean;
  childrens: (IWidgetProps[]);
}
```

## map

同 L7 [地图 Map](https://l7.antv.vision/zh/docs/api/scene#map-%E9%85%8D%E7%BD%AE%E9%A1%B9) 配置

## popup

地图信息框，展示地图信息

```ts
  {
    display?: boolean; // 是否显示
    enable?: boolean; // 是否生效
    options?: Partial<IPopupOption>;
    lngLat?:
      | number[]
      | {
          lng: number;
          lat: number;
        };
    childrens?: React.ReactNode;
  }
```

## controls

配置 control，可以配置任意多个 control
自定义业务控件，目前支持 8 个方位

```ts
type ControlPostions =
  | 'bottomleft'
  | 'bottomright'
  | 'topleft'
  | 'topright'
  | 'topcenter'
  | 'bottomcenter'
  | 'leftcenter'
  | 'rightcenter';
```

controls 配置示例

```ts
 {
   controls: [
      {
        display: true,
        position: 'topleft',
        type: 'mapStyle',
        title: '地图样式',
      },
      {
        display: true,
        position: 'topright',
        type: 'controlPosition',
        title: '组件控制',
      },
    ],
 }

```

<!-- <code src='../demo/control.tsx'> -->

## 地图默认组件

L7 地图基础控件

[组件](https://l7.antv.vision/zh/docs/api/component/control)

- scale
- Layers
- Zoom
- Layers

```ts
{
  defaultcontrols: [
    {
      type: 'zoom',
      position: 'bottomright',
      display: true,
    },
    {
      type: 'scale',
      position: 'bottomleft',
      display: true,
    },
  ];
}
```
