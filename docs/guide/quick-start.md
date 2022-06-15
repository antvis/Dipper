---
title: 快速上手
toc: content
order: 1
mobile: false
nav:
  title: 指南
  order: 1
---

## 安装

```bash
npm i @antv/l7 @antv/l7-react @antv/larkmap @antv/dipper
```

## 容器组件

DipperContainer

- cfg 为应用配置参数
- 支持传入子组件，AntD 组件，L7-React 组件

## 示例代码

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
