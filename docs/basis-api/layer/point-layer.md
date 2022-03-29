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

| 名称           | 说明                                            | 类型                                           | 默认值                                          |
| -------------- | ----------------------------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| name           | layerGroup 的唯一 id，必填                      | string                                         | -                                               |
| normal         | 正常展示状态下的样式                            | [IPointLayerStyle](#IPointLayerStyle)          | { size: 10, color: '#ff0000', shape: 'circle' } |
| hover          | 是否开启悬停，以及开启时悬停状态下的样式        | false \| [IPointLayerStyle](#IPointLayerStyle) | false                                           |
| select         | 是否开启选中，以及开启时选中状态下的样式        | false \| [IPointLayerStyle](#IPointLayerStyle) | false                                           |
| autoFit        | 设置数据后，自动填充展示图层至全屏（缩放+位移） | boolean                                        | false                                           |
| multipleSelect | 是否开启多选                                    | boolean                                        | false                                           |

## IPointLayerStyle

| 名称  | 类型                          |
| ----- | ----------------------------- |
| size  | ILayerFieldProperties<number> |
| color | ILayerFieldProperties<string> |
| shape | ILayerFieldProperties<string> |
| style | any                           |
