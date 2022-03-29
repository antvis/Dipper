---
title: useGlobalModel
order: 4
group:
  title: Hooks
  order: 4
mobile: false
---

`useGlobalModel` 获取全局数据，一般用于在 `Dipper` 框架中组件共享全局的数据

## API

```ts pure
import { useGlobalModel } from '@antv/dipper';

const [globalData, setGlobalData] = useGlobalModel();
```

| 参数          | 说明         | 类型                                  | 默认值 |
| ------------- | ------------ | ------------------------------------- | ------ |
| globalData    | 获取全局数据 |                                       |
| setGlobalData | 设置全局数据 | `(data: Record<string, any>) => void` |
