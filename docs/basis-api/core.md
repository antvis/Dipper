---
title: 基础 API
order: 0
toc: content
mobile: false
nav:
  title: 基础配置
  order: 2
---

TODO

- 组件注册
- 获取组件信息

## ConfigSerice

配置管理服务

### 属性

config

### 方法

#### setConfig

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
