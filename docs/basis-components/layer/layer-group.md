---
order: 1
mobile: false
group:
  title: 图层
  order: 5
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
    layerService.addLayerGroup(pointLayerGroup);
  }, []);

  return <></>;
};
```

## 悬停与选中

在 Dipper 中经常会与图层中的 `Feature` (元素) 进行互动，常见的交互方式有两种：悬停和选中。

- 悬停：表示鼠标悬浮在图层中的某个 `Feature` 上，通常会需要高亮当前 Feature，或者在弹出弹框展示 `Feature` 信息。
- 选中：表示

## 开发自定义图层

若开发者有需求可以自己定义图层类并继承 LayerGroup，在自定义图层类内部基于 L7 实现交互逻辑，在自定义图层类中，可以使用 LayerGroup。

### 自定义图层实例

<code src="./demo/layer-group/index" compact="true"></code>

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

| 名称           | 说明                                                                                                                                                    | 类型                                                                                                                                                    | 默认值       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| name           | layerGroup 的唯一 id，必填                                                                                                                              | string                                                                                                                                                  | -            |
| data           | 当期 layerGroup 所展示的数据                                                                                                                            | GeoJson                                                                                                                                                 | -            |
| options        | layerGroup 配置                                                                                                                                         | [T](#options-%E6%B3%9B%E5%9E%8B)                                                                                                                        | {}           |
| source         | L7 图层公用的 Source 对象，用于存储数据，当数据量较大且 LayerGroup 中存在多个相同数据的图层时，可以选择复用 Source 来减少大数据量所占内存空间，优化性能 | [Source](https://github.com/antvis/L7/blob/18c79fdd27fddcce4cd4f91183149c522297f8f0/packages/source/src/source.ts#L39)                                  | new Source() |
| selectFeatures | 当前选中的 feature 数组                                                                                                                                 | [IFeature](https://github.com/antvis/Dipper/blob/f5c4f9b355016b415f98863fcd9476a6f1733901/packages/core/src/services/layer/ILayerService.ts#L6)[]       | []           |
| hoverFeature   | 当前光标悬停的 feature                                                                                                                                  | [IFeature](https://github.com/antvis/Dipper/blob/f5c4f9b355016b415f98863fcd9476a6f1733901/packages/core/src/services/layer/ILayerService.ts#L6) \| null | null         |
| scene          | L7 中的 Scene 对象                                                                                                                                      | [Scene](https://github.com/antvis/L7/blob/587627042b4ec885718f2bd9581e55be6fefae5a/packages/scene/src/index.ts#L52)                                     | -            |
| mainLayer      | 当前 LayerGroup 实例中的 layer 主题，默认指向第一个被 addLayer 的 L7 Layer                                                                              | ILayer                                                                                                                                                  | -            |

## 方法

| 名称              | 说明                                                                                               | 类型                                                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initLayerList     | 抽象方法，在 layerService.addLayerGroup 传入 LayerGroup 实例时调用，用于初始化图层                 | () => void                                                                                                                                                                  |
| getDefaultOptions | 抽象方法，获取默认构造器参数，最终会与实例化时的 options 进行深合并                                | T                                                                                                                                                                           |
| addLayer          | 将 L7 Layer 添加至 LayerGroup 中                                                                   | (layer: ILayer) => void                                                                                                                                                     |
| getLayer          | 传入 layer 的 name 搜索并返回对应的 Layer                                                          | (name: string) => ILayer \| undefined                                                                                                                                       |
| getLayers         | 返回所有的 layers                                                                                  | () => ILayer[]                                                                                                                                                              |
| onLayerSelect     | 对传入的 layer 挂载点击选中/取消选中/多选事件                                                      | (layer: ILayer) => void;                                                                                                                                                    |
| offLayerSelect    | 对传入的 layer 取消挂载点击选中/取消选中/多选事件                                                  | (layer: ILayer) => void;                                                                                                                                                    |
| onLayerHover      | 对传入的 layer 挂载悬停事件                                                                        | (layer: ILayer) => void;                                                                                                                                                    |
| offLayerHover     | 对传入的 layer 取消挂载悬停事件                                                                    | (layer: ILayer) => void;                                                                                                                                                    |
| onClick           | L7 图层触发点击时的回调函数，内置了图层选中/取消选中/多选的判断                                    | (e: [IFeature](https://github.com/antvis/Dipper/blob/f5c4f9b355016b415f98863fcd9476a6f1733901/packages/core/src/services/layer/ILayerService.ts#L6)) => void;               |
| onMouseMove       | L7 图层触发悬停时的回调函数                                                                        | (e: [IFeature](https://github.com/antvis/Dipper/blob/f5c4f9b355016b415f98863fcd9476a6f1733901/packages/core/src/services/layer/ILayerService.ts#L6)) => void;               |
| onMouseOut        | L7 图层触发离开悬停时的回调函数                                                                    | (e: [IFeature](https://github.com/antvis/Dipper/blob/f5c4f9b355016b415f98863fcd9476a6f1733901/packages/core/src/services/layer/ILayerService.ts#L6)) => void;               |
| setHoverFeature   | 设置/取消悬停的 Feature，并触发 HOVER_FEATURE_CHANGE 事件                                          | (feature: [IFeature](https://github.com/antvis/Dipper/blob/f5c4f9b355016b415f98863fcd9476a6f1733901/packages/core/src/services/layer/ILayerService.ts#L6) \| null) => void; |
| setSelectFeatures | 设置/取消选中的 Features，并触发 SELECT_FEATURE_CHANGE 事件                                        | (features: [IFeature](https://github.com/antvis/Dipper/blob/f5c4f9b355016b415f98863fcd9476a6f1733901/packages/core/src/services/layer/ILayerService.ts#L6)[]) => void;      |
| setData           | 为当前 mainLayer 设置数据，当前仅支持 GeoJson                                                      | (data: GeoJson) => void;                                                                                                                                                    |
| setDataItem       | 更新单条 Feature 的 properties，第一个参数 featureId 可以通过 selectFeatures 或者 hoverSelect 获取 | (featureId: number, newProperties: Record<string, any>) => void                                                                                                             |
| setDataItemByKey  | 通过唯一 key 值来定位到单条 Feature，更新该 Feature 的 properties                                  | (key: string, value: any, newProperties: Record<string, any>) => void)                                                                                                      |
| show              | 显示所有图层                                                                                       | () => void                                                                                                                                                                  |
| hide              | 隐藏所有图层                                                                                       | () => void                                                                                                                                                                  |

## 事件

| 名称                | 说明               |
| ------------------- | ------------------ |
| visibleChange       | 显示/隐藏切换时    |
| dataUpdate          | 显示/隐藏切换时    |
| selectFeatureChange | 选中网格发生变更时 |
| hoverFeatureChange  | 悬停网格发生变更时 |

建议使用 `@antv/dipper` 中导入 `LayerGroupEventEnum` 事件名枚举来监听事件

```tsx | pure
import { LayerGroupEventEnum, PointLayerGroup } from '@antv/dipper';

const pointLayerGroup = new PointLayerGroup({
  name: 'point',
});

pointLayerGroup.on(
  LayerGroupEventEnum.SELECT_FEATURE_CHANGE,
  (selectFeatures) => {
    console.log(selectFeatures);
  },
);
```

## 通用接口

### ILayerFieldProperties

#### 说明

该接口主要针对在 Dipper 中需要动态设置到 L7 中的 `color`、`shape`、`size`等可能设置为静态或者根据字段动态映射的值，通过泛型`T` 传入对应字段的 `TypeScript` 基础类型，如：shape -> string, size -> number。

#### 接口定义

```ts
export type ILayerFieldProperties<T> =
  | T
  | T[]
  | { field: string; value: T | T[] | ((field: string) => T) };
```

#### 使用

```ts
import { ILayerFieldProperties } from '@antv/dipper-core/src';

export interface ICustomLayerOptions {
  color: ILayerFieldProperties<string>;
  size: ILayerFieldProperties<number>;
}
```
