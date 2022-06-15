---
title: 基础 API
order: 0
toc: content
mobile: false
nav:
  title: 基础配置
  order: 2
---

## registerWidget

`registerWidget(type, components)` 将组件注册到 `Dipper` 框架中。

```tsx pure
import { registerWidget } from '@antv/dipper';

const AComponents = () => {
  return <div></div>;
};
registerWidget('AComponents', AComponents);
```

### 参数

- type 组件名称
- components 组件实例

## getWidget

`getWidget(type)` 通过注册的组件名获取组件。

```ts pure
import { getWidget } from '@antv/dipper';
```

### 参数

- type 组件名称

## getAllWidgets

`getAllWidgets` 获取全部注册的组件。

```ts pure
import { getAllWidgets } from '@antv/dipper';
```
