---
title: 简介
order: 1
toc: menu
---

## 简介

Dipper 是基于 L7 地理分析应用开发框架，用于快速构建和开发地理分析应用。

## 核心特性

- 简单易用 React 结合

- 灵活配置 注册机制

- 任意扩展

### 快速上手

### 安装依赖

```bash
 npm i @antv/dipper
```

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
