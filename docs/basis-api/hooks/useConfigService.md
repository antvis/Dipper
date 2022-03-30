---
title: useConfigService
order: 0
group:
  title: Hooks
  order: 4
mobile: false
---

useConfigService Dipper 容器配置管理服务

## API

```ts pure
import { useConfigService } from '@antv/dipper';
const { configService, globalConfig } = useConfigService();
```

## 参数

无

## 结果

| 参数          | 说明                                                   | 类型                                 | 默认值 |
| ------------- | ------------------------------------------------------ | ------------------------------------ | ------ |
| configService | 服务实例                                               |                                      |
| globalConfig  | 全量配置                                               |                                      |
| setConfig     | 更新 config，path: 要设置的对象路径，value: 更新字段值 | `(path: string, value: any) => void` |
| updateControl | 更新 Control 配置,支持`type`,`position`,`display` 属性 | `(type: string, value: any) => void` |
