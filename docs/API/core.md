---
title: 基础能力
toc: menu
mobile: false
group:
  title: API
  order: 3
---

dipper-core 提供了一些框架共用的管理的能力方法。

## DipperContainer

Dipper 容器对象，复杂应用初始化和相关服务的管理

React 中可以通过

## ConfigSerice

配置管理服务

### 属性

config

### 方法

#### setConfig

#### getConfig

#### setWidgetsOptions

#### getWidgetsValue

#### setWidgetsValue

#### getWidgetsOptions

## Widgets

### 获取 getWidget

获取名称获取组件

#### 参数

- type 组件名称

```ts
import { getWidget } from '@antv/dipper-core';
```

### 注册 registerWidget

registerWidget

#### 参数

- type 组件名称
- components 组件实例

```js
registerWidget('name', A);
```
