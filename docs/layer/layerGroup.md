---
order: 1
mobile: false
---

# LayerGroup 图层基类

## 定义

LayerGroup 作为 Dipper 中所有图层的父类，内部实现了一系列属性和函数用于规范和约束子类的具体实现，当前 Dipper 中所有内置图层类都是基于 LayerGroup。

LayerGroup 实例在初始化完成之后，需要被 LayerService 注册才能添加至地图中，一般在 React 组件中可以通过 hook：**useLayerService** 获取到 LayerService 实例将并执行 LayerGroup 的添加操作。

```tsx | pure
import React, { useEffect } from 'react';
import { useLayerService, PointLayerGroup } from '@antv/dipper';

export default () => {
  const { layerService } = useLayerService();

  useEffect(() => {
    const pointLayerGroup = new PointLayerGroup({
      name: 'point',
    });
    // 将layerGroup实例注册进layerService中，图层才算是添加到地图中
    layerService.addLayer(pointLayerGroup);
  }, []);

  return <></>;
};
```

## 开发自定义图层

若开发者有需求可以自己定义图层类并继承 LayerGroup，在自定义图层类内部基于 L7 实现交互逻辑，在自定义图层类中，可以使用 LayerGroup。

### 自定义图层实例

<code src="./demo/layerGroup/index" compact="true"></code>

自定义图层的代码可以查看 **widgets/CustomLayerGroup.ts** 文件

### options 泛型

开发者在实现自己的自定义图层时，可以对图层类实例化时的传参类型进行约束，可以在继承 `LayerGroup` 的同时，传入泛型来实现构造器参数的约束，不传默认为 any。

```tsx | pure
// @antv/dipper中

class LayerGroup<T = any> {
  options: T;
}

// 用户自定义LayerGroup中
import { PointLayer } from '@antv/l7';
import { LayerGroup } from '@antv/dipper';

interface ICustomLayerOptions {
  myProperties: boolean;
}

class CustomLayerGroup extends LayerGroup<ICustomLayerOptions> {
  onClick() {
    const { myProperties } = this.options;
    // ....
  }
}
```

### 抽象方法

#### abstract initLayerList(): void;

用于初始化当前 LayerGroup 中所含的各个基础 L7 图层，需要注意将特殊状态（如选中态）的图层也要一并初始化，初始化后需要调用`this.addLayer`方法将其注册。

通常会在 `initLayerList` 方法中获取用户传入的配置，并作用到 L7 图层设置中

一般情况第一个被 addLayer 的图层将作为整个 LayerGroup 的主图层 `mainLayer`，后续更新数据或者判定选中也是针对 `mainLayer` 进行的。

```tsx | pure
import { PointLayer } from '@antv/l7';
import { LayerGroup } from '@antv/dipper';

interface ICustomLayerOptions {
  color: string;
}

class CustomLayerGroup extends LayerGroup<ICustomLayerOptions> {
  initLayerList() {
    const { color } = this.options;
    const pointLayer = new PointLayer({
      name: 'point',
    });
    pointLayer.color(color);
    //  一些根据options配置pointLayer的代码
    this.addLayer(pointLayer);
  }
}
```

#### abstract getDefaultOptions(): T;

> `T` 为自定义类继承 LayerGroup 传入的泛型，详细可[跳转](#options-%E6%B3%9B%E5%9E%8B)

该函数返回当前自定义图层类的默认 options，默认值将会与构造器传入的 options **深合并** 后保存在 `this.options` 中。

## 属性

## 方法

| 名称              | 说明                                                                                               | 类型                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| initLayerList     | 抽象方法，在 layerService.addLayer 传入 LayerGroup 实例时调用，用于初始化图层                      | () => void                                                             |
| getDefaultOptions | 获取默认构造器参数，最终会与实例化时的 options 进行深合并                                          | T                                                                      |
| addLayer          | 将 L7 Layer 添加至 LayerGroup 中                                                                   | (layer: ILayer) => void                                                |
| getLayer          | 传入 layer 的 name 搜索并返回对应的 Layer                                                          | (name: string) => ILayer \| undefined                                  |
| getLayers         | 返回所有的 layers                                                                                  | () => ILayer[]                                                         |
| onLayerSelect     | 对传入的 layer 挂载点击选中/取消选中/多选事件                                                      | (layer: ILayer) => void;                                               |
| offLayerSelect    | 对传入的 layer 取消挂载点击选中/取消选中/多选事件                                                  | (layer: ILayer) => void;                                               |
| onLayerHover      | 对传入的 layer 挂载悬停事件                                                                        | (layer: ILayer) => void;                                               |
| offLayerHover     | 对传入的 layer 取消挂载悬停事件                                                                    | (layer: ILayer) => void;                                               |
| onClick           | L7 图层触发点击时的回调函数，内置了图层选中/取消选中/多选的判断                                    | (e: IFeature) => void;                                                 |
| onMouseMove       | L7 图层触发悬停时的回调函数                                                                        | (e: IFeature) => void;                                                 |
| onMouseOut        | L7 图层触发离开悬停时的回调函数                                                                    | (e: IFeature) => void;                                                 |
| setHoverFeature   | 设置/取消悬停的 Feature，并触发 HOVER_FEATURE_CHANGE 事件                                          | (feature: IFeature \| null) => void;                                   |
| setSelectFeatures | 设置/取消选中的 Features，并触发 SELECT_FEATURE_CHANGE 事件                                        | (features: IFeature[]) => void;                                        |
| setData           | 为当前 mainLayer 设置数据，当前仅支持 GeoJson                                                      | (data: GeoJson) => void;                                               |
| setDataItem       | 更新单条 Feature 的 properties，第一个参数 featureId 可以通过 selectFeatures 或者 hoverSelect 获取 | (featureId: number, newProperties: Record<string, any>) => void        |
| setDataItemByKey  | 通过唯一 key 值来定位到单条 Feature，更新该 Feature 的 properties                                  | (key: string, value: any, newProperties: Record<string, any>) => void) |
| show              | 显示所有图层                                                                                       | () => void                                                             |
| hide              | 隐藏所有图层                                                                                       | () => void                                                             |

## LayerEvent
