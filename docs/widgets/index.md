---
title: 通用配置
toc: menu
order: 0
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
如果组件作为 Control 添加，支持 8 个方位

```ts
'bottomleft' |
  'bottomright' |
  'topleft' |
  'topright' |
  'topcenter' |
  'bottomcenter' |
  'leftcenter' |
  'rightcenter';
```

如果组件做为 headbar 添加支持 3 个方法

```ts
| "left"
| "center"
| "right"
```

#### options 可选

组件内部配置信息

#### children 可选

子组件 数据格式

### 配置示例

```ts
   {
    display: true,
    options: {
      enableToggle: true,
      defaultTitle: '所有网格',
      opened: true,
      width: 360,
    },
    position: 'right',
    children: [
      {
        display: true,
        type: 'meshName',
        title: '网格名称',
      },
    }

```
