---
mobile: false
group:
  title: 图层
  order: 5
---

# GridLayerGroup 填充图

填充图主要用展示，区域类，网格类的面状数据的可视化展示。

<code src="./demo/grid-layer" compact="true" />

## 构造函数

## name

    网格名称、唯一值，可根据网格名称获取网格实例

## data

    网格数据，数格式为 GeoJson,目前为开放其他数据扩展

## options

    图层配置项目，用于设置图层样式，如标注字段，颜色，填充颜色字段的部分的

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| normal | 正常展示状态下的样式 | [IGridLayerStyle](#IGridLayerStyle) | { size: 10, color: '#ff0000', shape: 'circle' } |
| hover | 是否开启悬停，以及开启时悬停状态下的样式 | false 或 [IGridLayerStyle](#IGridLayerStyle) | false |
| select | 是否开启选中，以及开启时选中状态下的样式 | false 或 [IGridLayerStyle](#IGridLayerStyle) | false |
| text | 设置数据后，自动填充展示图层至全屏（缩放+位移） | false 或 [ILayerGroupText](#ILayerGroupText) | false |
| autoFit | 设置数据后，自动填充展示图层至全屏（缩放+位移） | boolean | false |
| multipleSelect | 是否开启多选 | boolean | false |

### GridLayerGroup normal 样式配置

| 名称 | 说明 | 类型                                                                                                  |
| --- | --- |-----------------------------------------------------------------------------------------------------|
| fillColor | 填充颜色 | [ILayerFieldProperties](#ILayerFieldProperties)&lt;string&gt;                                                            |
| borderColor | 边框颜色 | [ILayerFieldProperties](#ILayerFieldProperties)&lt;string&gt;                                                                 |
| borderWidth | 边框宽度 | [ILayerFieldProperties](#ILayerFieldProperties)&lt;number&gt;                                                                 |
| fillColor | 填充颜色 | [ILayerFieldProperties](#ILayerFieldProperties)&lt;string&gt;                                                                 |
| style | 网格填充色图层的 style | L7 PolygonLayer 中[style 方法的参数](https://l7.antv.vision/zh/docs/api/polygon_layer/polygonlayer#style) |
| borderStyle | 网格边框图层的 style | L7 PolygonLayer 中[style 方法的参数](https://l7.antv.vision/zh/docs/api/polygon_layer/polygonlayer#style) |
| scale | 字段映射配置 | [ILayerScale](#ILayerScale)                                                                         |

### GridLayerGroup hover && select 样式配置

| 名称        | 说明     | 类型                                |
| ----------- | -------- | ----------------------------------- |
| borderColor | 边框颜色 | [ILayerFieldProperties](#ILayerFieldProperties)&lt;string&gt; |
| borderWidth | 边框宽度 | [ILayerFieldProperties](#ILayerFieldProperties)&lt;number&gt; |

### ILayerGroupText

```typescript
export interface ILayerGroupText {
  field: string;
  color: ILayerFieldProperties<string>;
  size: ILayerFieldProperties<number>;
  weight: number;
}
```

### ILayerFieldProperties

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
      // 以下为 ILayerFieldProperties 属性的几种使用方式
      color: '#ffffff', // 单值模式
      shape: ['circle', 'triangle'], // 多值模式
      size: {
        // 字段映射模式
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

### ILayerScale

定义

```ts
export interface IScale {
  type: ScaleTypeName;
  field?: string;
  ticks?: any[];
  nice?: boolean;
  format?: () => any;
  domain?: any[];
}

export interface IScaleOptions {
  [key: string]: IScale | undefined;
}

export type ILayerScale = IScaleOptions | [string, IScale];
```

示例

```ts
const gridLayerGroup = new GridLayerGroup({
  name: 'grid',
  options: {
    normal: {
      //  ...
      scale: {
        //  centerLng 为数据中的字段key值
        centerLng: {
          type: 'quantile',
        },
      },
    },
  },
});
```

## 方法

## show

图层选

## hide

图层隐藏

## destroy

图层销毁

## 事件
