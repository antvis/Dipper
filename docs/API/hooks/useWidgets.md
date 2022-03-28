---
title: useWidgets
order: 1
group:
  title: Hooks
  order: 4
mobile: false
---

useWidgets 根据 ID 获取组件配置

## API

```ts pure
import { useWidgets } from '@antv/dipper';
const {} = useWidgets('select');
```

## 参数

| 参数 | 说明                  | 类型   | 默认值 |
| ---- | --------------------- | ------ | ------ |
| id   | 组件的 ID 或组件 type | string | (必选) |

## 结果

| 参数           | 说明               | 类型                     | 备注 |
| -------------- | ------------------ | ------------------------ | ---- |
| widget         | widget 实例        | `IWidget`                | -    |
| widgetsOptions | 设置 widget 配置项 | `any`                    | -    |
| widgetsValue   | widget 值          | `any`                    | -    |
| setOption      | widget 值          | `(options: any) => void` | -    |
| setValues      | 更新 widget value  | `(values: any) => void`  | -    |
