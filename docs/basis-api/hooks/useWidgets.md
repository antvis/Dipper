---
title: useWidget
order: 2
group:
  title: Hooks
  order: 4
mobile: false
---

`useWidget` 获取与更新组件数据

## API

```ts pure
import { useWidget } from '@antv/dipper';
const { widget, widgetValue, setValue } = useWidget('select');
```

## 参数

| 参数 | 说明                  | 类型   | 默认值 |
| ---- | --------------------- | ------ | ------ |
| id   | 组件的 ID 或组件 type | string | 必选   |

## 结果

| 参数          | 说明                | 类型                     | 备注 |
| ------------- | ------------------- | ------------------------ | ---- |
| widget        | widget 实例         | `IWidget`                | -    |
| widgetValue   | 获取 widget value   | `any`                    | -    |
| setValue      | 更新 widget value   | `(value: any) => void`   | -    |
| widgetOptions | widget 配置项       | `any`                    | -    |
| setOptions    | 更新 widget options | `(options: any) => void` | -    |
