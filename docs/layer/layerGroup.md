---
order: 1
mobile: false
---

# LayerGroup 图层基类

## 定义

LayerGroup 作为 Dipper 中所有图层的父类，内部实现了一系列函数用于规范和约束子类的具体实现，当前 Dipper 中所有内置图层类都是基于 LayerGroup。

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
    //  ...
    layerService.addLayer(pointLayerGroup);
  }, []);

  return <></>;
};
```

## 开发自定义图层

若开发者有需求可以自己定义图层类并继承 LayerGroup，在自定义图层类内部基于 L7 实现交互逻辑，在自定义图层类中，可以使用 LayerGroup。

### 自定义图层实例：

自定义图层的代码可以查看 **widgets/CustomLayerGroup.ts** 文件

<code src="./demo/layerGroup/index" compact="true"></code>

## 属性/attrs

| 名称    | 说明                         | 类型               | 默认值 |
| ------- | ---------------------------- | ------------------ | ------ |
| name    | layerGroup 的唯一 id，必填   | string             | -      |
| data    | 当期 layerGroup 所展示的数据 | GeoJson            | -      |
| options | layerGroup 配置              | 类型由用户自己实现 | {}     |

[//]: # '|    setDataItemByKey       |                                      |        |'
[//]: # '| show      | 显示 layerGroup                        |        |'
[//]: # '| hide      | 隐藏 layerGroup                        |        |'
[//]: # '| destory   | 摧毁 layerGroup                        |        |'
[//]: # '| boxSelect | layerGroup 被框选时的回调函数，用于计算并设置框选住的 features | -      |'
