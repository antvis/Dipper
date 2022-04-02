---
title: useLayerGroup
order: 3
group:
  title: Hooks
  order: 4
mobile: false
---

useLayerGroup 可视化图层

## API

```ts pure
import { useLayerGroup } from '@antv/dipper';
const { selectFeatures, selectFeatures } = useLayerGroup('grid');
```

## 参数

| 参数 | 说明                                           | 类型   | 默认值 |
| ---- | ---------------------------------------------- | ------ | ------ |
| id   | layergroup 唯一标识 ID， 组件的 ID 或组件 type | string | (必选) |

## 结果

| 参数            | 说明           | 类型                                            | 备注 |
| --------------- | -------------- | ----------------------------------------------- | ---- |
| layerGroup      | 图层 实例      | `IWidget`                                       | -    |
| layerData       | 图层数据       | `featureCollection`                             | -    |
| setLayerData    | 更新图层数据   | `(data: featureCollection) => void`             | -    |
| selectFeatures  | 选中的要素     | `(feature:Feature[], uniqueKey = 'id') => void` | -    |
| hoverFeature    | 划过高亮的数据 | `feature`                                       | -    |
| setHoverFeature | 设置高亮数据   | `(feature:Feature, uniqueKey = 'id') => void`   | -    |
