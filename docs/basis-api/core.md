---
title: 基础 API
toc: menu
mobile: false
group:
  title: config
  order: 3
nav:
  title: 基础配置
  order: 2
---

<!-- dipper-core 提供了一些框架共用的管理的能力方法。 -->

## DipperContainer

Dipper 容器对象，复杂应用初始化和相关服务的管理

React 中可以通过

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
