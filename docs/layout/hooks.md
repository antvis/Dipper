---
title: Hooks
order: 4
toc: menu
---

dipper 针对 React 技术栈对核心 Service 进行了 hooks 封装，在 React 组件中使用更便捷

## useConfigService

配置项管理

### configService

configService 对象

### globalConfig

dipper 全局配置

### setConfig

    更新 config 方法

参数：

- field: 要设置的对象路径
- value: 更新字段值

```js
setConfig('');
```

### updateLegend

更新图例

### updateControl

更新空间

### setWidgetsOptions

设置 Widget 配置项

### getWidgetsOptions

获取 Widget 配置项

### setWidgetsValue

设置 Widget 值

### getWidgetsValue

获取 Widget 结果值

## useLayerService

图层管理

## usePanelService

面板管理

## useSceneService

场景管理

## useSceneContainer

场景容器

## useLayerGroup

图层
