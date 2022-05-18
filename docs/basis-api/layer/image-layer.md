---
mobile: false
group:
  title: 图层
  order: 5
---

# ImageLayer 图片图层

用于展示图片（和文字）的图层，相比于MarkerLayerGroup，ImageLayer 会将图片直接绘制在Canvas上，具有更好的性能。

<code src="./demo/image-layer/index" compact="true"></code>

## 构造器传参

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片 key 和 url 的映射 | {[key: string]: string} | {} |
| normal | 正常展示状态下的样式 | [IImageLayerStyle](#IImageLayerStyle) | { size: 10, color: '#ff0000', shape: 'circle' } |
| select | 是否开启选中，以及开启时选中状态下的样式 | false 或 [IImageLayerStyle](#IImageLayerStyle) | false |
| autoFit | 设置数据后，自动填充展示图层至全屏（缩放+位移） | boolean | false |

## IImageLayerStyle

```ts
export interface IImageLayerStyle extends IImageLayerImageStyle {
  text?: string; // 展示文本对应的字段key值，不传时不展示文本
  textColor?: ILayerFieldProperties<string>; // 文本颜色
  textSize?: number; // 文本大小
  textStyle?: any; // 文本图层Style

  img: ILayerFieldProperties<string>; // 图片字段映射设置
  imgSize?: number; // 图片大小
  imgStyle?: Record<string, any>; // 图片图层样式
}
```

## ILayerFieldProperties

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
