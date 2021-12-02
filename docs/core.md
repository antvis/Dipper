---
title: 基础能力
order: 3
toc: menu
---

dipper-core 提供了一些框架共用的管理的能力方法。

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
