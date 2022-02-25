---
title: PC 端布局
order: 4
toc: menu
mobile: false
group:
  title: 布局组件
  order: 8
---

### 通用布局

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
