---
title: 配置
order: 1
toc: content
mobile: false
nav:
  title: PC 端
  order: 5
---

## config 全局配置

## Widget 配置项

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
  扩展可选配置项，主要是组件内部自身的配置
