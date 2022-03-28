---
title: 布局
order: 0
toc: content
mobile: false
nav:
  title: PC 端
  order: 5
---

### 布局

Dipper 目前 PC 端规范了一套默认的布局模式，组织和规范各个组件的交互联动

![Dipper 应用布局](https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*So9xQZWYzGUAAAAAAAAAAAAAARQnAQ)

```tsx
/**
 *
 * defaultShowCode: true
 */
import React, { useEffect, useState } from 'react';
import {
  DipperContainer,
  registerWidget,
  useConfigService,
} from '@antv/dipper';

export default function DipperMap() {
  return (
    <div style={{ height: '300px' }}>
      <DipperContainer
        cfg={{
          controls: [
            {
              display: true,
              position: 'topleft',
              type: 'mapStyle',
              title: '地图样式',
            },
          ],
        }}
      />
    </div>
  );
}
```

<API hideTitle src='../../packages/pc/src/layout/Container/index.tsx'></API>

### 布局组件
