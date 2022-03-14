---
title: Hooks
order: 1
group:
  title: API
  order: 3
mobile: false
---

dipper 针对 React 技术栈对核心 Service 进行了 hooks 封装，在 React 组件中使用更便捷

## useConfigService

配置项管理

### configService

configService 对象

### globalConfig

dipper 全局配置

### setConfig

    更新 config方法

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

方便开发者在 React 中快速获取到获取 `LayerService` 实例，并将 `LayerGroup` 实例注册进 `LayerGroup` 中

```tsx | pure
import { PointLayerGroup } from '@antv/dipper-layout';

export default () => {
  const { layerService } = useLayerService();

  useEffect(() => {
    const pointLayerGroup = new PointLayerGroup({
      name: 'point',
    });

    layerService.addLayer(pointLayerGroup);
  }, []);
};
```

## usePanelService

面板管理

## useSceneService

场景管理

## useDipperContainer

场景容器

## useLayerGroup

用于获取指定 `LayerGroup` 实例上的一些常用数据和方法，可以传入实例化 `LayerGroup` 时的 `name` 字段或者传入 `LayerGroup`实例自身来定位并使用 hook 提供的属性和方法。

```tsx | pure
// 初始化 LayerGroup
const pointLayerGroup = new PointLayerGroup({
  name: 'point',
});

layerService.addLayerGroup(pointLayerGroup);

// 在React组件中使用
export default () => {
  const {
    layerGroup, // LayerGroup 实例
    layerData, // 图层GeoJson数据
    setLayerData, // 设置图层GeoJson数据
    selectFeatures, // 选中网格数组Features
    setSelectFeatures, // 设置选中Features
    hoverFeature, // 悬停网格
    setHoverFeature, // 设置悬停的网格
  } = useLayerGroup('point');

  useEffect(() => {
    // 当选中网格发生变化时，打印当前选中selectFeatures
    console.log(selectFeatures);
  }, [selectFeatures]);
};
```
