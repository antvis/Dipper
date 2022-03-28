---
title: 图例
toc: content
order: 2
group:
  title: 地图组件
  order: 4
---

## 图例

### 连续分类图例

主要用来表达连续数值可视化、图例为水平展示

- title 图例名称 `string`
- items 图例项目 ` object`
  - color `string`
  - value `number | [number,number]`

### 枚举图例

主要用来表达连续数值可视化

- title 图例名称 `string`
- items 图例项目 ` object`
  - color `string`
  - value `number | [number,number]` value 如果为数组将连接成字符串
