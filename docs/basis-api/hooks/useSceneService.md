---
title: useSceneService
order: 1
group:
  title: Hooks
  order: 4
mobile: false
---

# useSceneService

`useSceneService` 获取地图的场景管理服务

## API

```ts pure
import { useSceneService } from '@antv/dipper';
const { sceneService, scene } = useSceneService();
```

### 结果

| 参数         | 说明                     | 类型  | 备注 |
| ------------ | ------------------------ | ----- | ---- |
| sceneService | sceneService 实例        |       | -    |
| scene        | Scene 实例，操作地图配置 | `any` | -    |
