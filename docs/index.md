---
title: 简介
order: 0
toc: menu
---

## 简介

Dipper 是基于 L7 地理分析应用开发框架，用于快速构建和开发地理分析应用。

[Github Dipper](https://github.com/antvis/dipper)

## 核心特性

- 简单易用 React 结合

- 一切皆组件、灵活配置、注册机制

- 任意扩展

### 组件 Widgets

Dipper 核心概念一切皆组件(Widgets)

#### 组件特性

- 相互嵌套
- 相互组合，
- 位置可选

#### 组件分类

- 通用组件
- 模板组件
- 业务组件

### 快速上手

### 安装依赖

```bash
 npm i @antv/dipper
```

### 根容器组件

DipperContainer
参数

- cfg 应该配置

DipperContainer 支持传入子组件，AntD 组件，L7-React 组件

### 示例代码

```jsx pure
import React, { useEffect, useState } from 'react';
import { DipperContainer, IConfig } from '@antv/dipper';

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer cfg={{}} />
    </div>
  );
}
```

```jsx
import React, { useEffect, useState } from 'react';
import { DipperContainer, IConfig } from '@antv/dipper';

export default function RumbMap() {
  return (
    <div style={{ height: '500px' }}>
      <DipperContainer cfg={{}} />
    </div>
  );
}
```
