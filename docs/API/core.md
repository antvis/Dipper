---
title: 组件
toc: menu
mobile: false
group:
  title: API
  order: 3
---

## Widgets

### 注册 registerWidget

开发完成一个组件需要注册到 Dipper 才能使用。

registerWidget

#### 参数

- type 组件名称
- components 组件实例

```js
registerWidget('name', A);
```

### 获取 getWidget

获取名称获取组件

#### 参数

- type 组件名称

```ts
import { getWidget } from '@antv/dipper-core';
``;
```
