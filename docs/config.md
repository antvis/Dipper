---
title: 配置项
order: 2
toc: menu
---

## viewData

### global

管理和存储一些全局配置

### widgets

管理和存储组件数据

## headerbar

头部导航配置、支持设置 Logo、Title、子组件

![导航条](https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*xs_VQpVoDWgAAAAAAAAAAAAAARQnAQ)

```ts
 {
    display?: boolean;
    headerstyle?: React.CSSProperties;

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
    children?: IWidgetProps<'left' | 'right' | 'center'>[];
 }
```

## toolBar

二级工具条,用于放置地图交互工具

```ts
{
  display: boolean;
  children: (IWidgetProps < 'left') | ('right' > []);
}
```

## map

同 L7 [地图 Map](https://l7.antv.vision/zh/docs/api/scene#map-%E9%85%8D%E7%BD%AE%E9%A1%B9) 配置

## popup

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
    children?: React.ReactNode;
  }
```

## control

## defaultcontrols

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
  children?: IWidgetProps<string>[]; // 子组件
 }
```

## layer
