---
title: 开发联调
order: 1
mobile: false
---

Dipper 功能在不断迭代完善中，在业务开发过程可能需要修改或者优化相关代码，如何将 Dipper 和项目联动。

#### link dipper 相关模块

`yarn run link`

#### watch 需要修改模块

在模块目标下执行

`yarn run build-wath`

#### 项目中 link dipper 模块

```bash

yarn link  @antv/dipper-core
yarn link  @antv/dipper-layout
yarn link  @antv/dipper
yarn link  @antv/dipper-widgets

```
