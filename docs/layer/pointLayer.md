---
order: 2
mobile: false
group:
  title: 图层组件
  order: 5
---

# PointLayerGroup 点图层

`PointLayerGroup` 继承了 LayerGroup, 除了在 [L7 PointLayer](https://l7.antv.vision/zh/docs/api/point_layer/pointlayer) 的基础上，实现了悬停和选中(单选/多选)的图层交互逻辑。

## 设置颜色和形状

<code src="./demo/pointLayer/color/index" compact="true"></code>

## 选中和悬停示例

<code src="./demo/pointLayer/hover/index" compact="true"></code>

# 构造器传参

| 名称 | 说明                       | 类型   | 默认值 |
| ---- | -------------------------- | ------ | ------ |
| name | layerGroup 的唯一 id，必填 | string | -      |
