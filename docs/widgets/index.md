---
title: 简介
order: 0
toc: menu
group:
  title: 组件
---

### 组件通用配置

#### type 必选

    组件类型，注册的组件名称

#### title 可选

    组件名称

#### position 可选

    组件所在的区域不同位置可选不同。
    如果组件作为Control 添加，支持 8个方位

    ```ts
         'bottomleft'
        | 'bottomright'
        | 'topleft'
        | 'topright'
        | 'topcenter'
        | 'bottomcenter'
        | 'leftcenter'
        | 'rightcenter' ```

    如果组件做为headbar 添加支持 3个方法

    ```ts
         | "left"
         | "center"
         | 'right"
     ```

#### options 可选

    组件内部配置信息

#### children 可选

    子组件 数据格式

### 配置示例

```ts

```
