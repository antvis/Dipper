---
order: 2
mobile: false
group:
  title: 图层
  order: 5
---

# PointLayerGroup 点图层

`PointLayerGroup` 继承了 LayerGroup, 除了在 [L7 PointLayer](https://l7.antv.vision/zh/docs/api/point_layer/pointlayer) 的基础上，实现了悬停和选中(单选/多选)的图层交互逻辑。

## 设置颜色和形状

<code src="./demo/point-layer/color/index" compact="true"></code>

## 选中和悬停示例

<code src="./demo/point-layer/hover/index" compact="true"></code>

# API

## 构造器传参

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | layerGroup 的唯一 id，必填 | string | - |
| normal | 正常展示状态下的样式 | [IPointLayerStyle](#IPointLayerStyle) | { size: 10, color: '#ff0000', shape: 'circle' } |
| hover | 是否开启悬停，以及开启时悬停状态下的样式 | false \| [IPointLayerStyle](#IPointLayerStyle) | false |
| select | 是否开启选中，以及开启时选中状态下的样式 | false \| [IPointLayerStyle](#IPointLayerStyle) | false |
| autoFit | 设置数据后，自动填充展示图层至全屏（缩放+位移） | boolean | false |
| multipleSelect | 是否开启多选 | boolean | false |

## IPointLayerStyle

| 名称  | 类型                                                            |
| ----- |---------------------------------------------------------------|
| size  | [ILayerFieldProperties](#ILayerFieldProperties)&lt;number&gt; |
| color | [ILayerFieldProperties](#ILayerFieldProperties)&lt;string&gt; |
| shape | [ILayerFieldProperties](#ILayerFieldProperties)&lt;string&gt; |
| style | L7 PointLayer中[style方法的参数](https://l7.antv.vision/zh/docs/api/point_layer/pointlayer#style)                                      |

## ILayerFieldProperties

用于 L7 中设置值映射相关的属性

```typescript
export type ILayerFieldProperties<T> =
  | T
  | T[]
  | { field: string; value: T | T[] | ((field: string) => T) };
```

示例

```typescript
const pointLayerGroup = new PointLayerGroup({
  name: 'point',
  options: {
    normal: {
      color: '#ffffff', // 单值模式
      shape: ['circle', 'triangle'], // 多值模式
      size: { // 字段映射模式
        field: 'value',
        value: (value) => {
          return value * 10;
        },
        // value: [1, 50]
      },
    },
  },
});
```
