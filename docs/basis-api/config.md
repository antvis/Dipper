---
title: 配置
order: 1
toc: content
mobile: false
nav:
  title: PC 端
  order: 5
---

TODO:

- config 内容

<!-- ## Widget

dipper 配置项围绕 Widget,每个 Widgets 是个组件，同时也可以包含子组件。

Widget 属性定义

```ts
export interface IWidgetProps {
  type: string;
  title?: string;
  position?: T | string;
  display?: boolean;
  options?: any;
  childrens?: IWidgetProps[];
  [key: string]: any;
}
```

- options
  扩展可选配置项，主要是组件内部自身的配置 -->

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

<code src='./demo/control.tsx'>

## defaultcontrols

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

## legends

## panel

```ts
 {
  display: boolean; // 是否关闭
  enableToggle: boolean; // 是否允许打开关闭
  defaultTitle?: string;
  width?: number; // 宽度
  opened?: boolean; // 是否打开
  position?: 'left' | 'right' | 'top' | 'bottom'; // 位置
  style?: React.CSSProperties; // 样式
  childrens?: IWidgetProps[]; // 子组件
 }
```

## layer
