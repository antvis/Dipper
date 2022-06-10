---
title: useGlobalModel
order: 4
group:
  title: Hooks
  order: 4
mobile: false
---

# useGlobalModel

`useGlobalModel` 获取全局数据，一般用于在 `Dipper` 框架中组件共享全局的数据

```tsx pure
const [globalData, setGlobalData] = useGlobalModel<T extends Record<string, any>>()
```

## API

```tsx pure
import { useGlobalModel } from '@antv/dipper';

const [globalData, setGlobalData] = useGlobalModel<{ count: number; add: number }>();

setGlobalData({ count: 1 });
// globalData => { count: 1 }

setGlobalData({ add: 1 });
// globalData => { count: 1, add: 1 }

setGlobalData((prevState) => ({ ...prevState, add: prevState.add + 1 }));
// globalData => { count: 1, add: 2 }
```

### 结果

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| globalData | 获取全局数据 | `T` | `{}` |
| setGlobalData | 设置全局数据 | `(value: Partial<T> ｜ ((prevState: T) => Partial<T>)) => void` |
