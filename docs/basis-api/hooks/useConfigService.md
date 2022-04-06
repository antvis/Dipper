---
title: useConfigService
order: 0
group:
  title: Hooks
  order: 4
mobile: false
---

# useConfigService

`useConfigService` 获取 `Dipper` 容器配置管理数据

## API

```ts pure
import { useConfigService } from '@antv/dipper';
const { globalConfig, setConfig, updateControl } = useConfigService();
```

### 结果

| 参数          | 说明                                                       | 类型                                  | 默认值 |
| ------------- | ---------------------------------------------------------- | ------------------------------------- | ------ |
| configService | 服务实例                                                   |                                       |
| globalConfig  | 全部的配置项                                               |                                       |
| setConfig     | 更新 config，field 要更新的对象路径，value: 更新字段的值   | `(field: string, value: any) => void` |
| updateControl | 更新 Control 配置，支持 `type`、`position`、`display` 属性 | `(type: string, value: any) => void`  |
