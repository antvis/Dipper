---
title: 配置
order: 0
toc: content
mobile: false
nav:
  title: PC 端
  order: 5
---
## 简介
Dipper 提供了 PC 端的主题模板，用于快速初始化 PC 端地图分析应用。

布局如下图：

![Dipper 应用布局](https://gw.alipayobjects.com/mdn/rms_08cc33/afts/img/A*coZJR4sZs9gAAAAAAAAAAAAAARQnAQ)

初始化地图首先需要传入一个配置项，配置项用于定义地图、数据、组件的相关配置。

```tsx pure
<DipperContainer cfg={}/>
```


## 地图类


### mapType 
地图底图类型，支持4种

- `GaodeV1` 
- `GaodeV2`
- `MapBox`
- `Map`

### scene

 地图场景配置、同L7 Scene 配置项

 [scene 配置项](https://l7.antv.vision/zh/docs/api/scene#%E5%9C%B0%E5%9B%BE%E9%85%8D%E7%BD%AE%E9%A1%B9)

### map

地图配置同 L7 Map 配置项，配置地图样式，初始化化缩放等级

[地图配置项](https://l7.antv.vision/zh/docs/api/scene#map-%E9%85%8D%E7%BD%AE%E9%A1%B9)

### popup

地图信息框，展示地图信息

```ts
  {
    display?: boolean; // 是否显示
    enable?: boolean; // 是否生效
    options?: Partial<IPopupOption>;
    lngLat?:
      | number[]
      | {
          lng: number;
          lat: number;
        };
    childrens?: React.ReactNode;
  }
```

## 数据类

### global
  全局数据配置 key、value 形式保存

### widgets
组件初始化数据配置，比如初始化选择器，需要通过 options 设置组件选择列表参数，Value 为默认选中值
- key 组件的 ID 
- value 
  - options 组件初始化值
  - values 组件默认值

``` tsx pure
 Record<
    string,
    {
      options?: Record<string, any> | Record<string, any>[]; // 初始化数据
      value?: Record<string, any> | Record<string, any>[]; // 结果数据
    }
  >;
```
## 布局组件类

### headerbar 导航条

头部导航配置、支持设置 Logo、Title、子组件

![导航条](https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*xs_VQpVoDWgAAAAAAAAAAAAAARQnAQ)

```ts
 {
    display?: boolean;
    headerstyle?: React.CSSProperties;
    url:string; // 点击导航回到首页

    logo: Partial<{
      display: boolean;
      value: string;
      style: React.CSSProperties;
      href: string;
    }>;
    title: Partial<{
      value: string;
      display: boolean;
      style: React.CSSProperties;
    }>;
    childrens?: IWidgetProps[];
 }
```

### toolBar 工具条

二级工具条,用于放置地图交互工具，可选

```ts
{
  display: boolean;
  childrens: (IWidgetProps[]);
}
```
### panel 信息框

地图侧边信息窗口，dipper 提供了panel容器，放置内容需要定制组件开发

``` tsx pure 
interface IPanel {
  display: boolean; // 是否显示
  position?: 'left' | 'right' | 'top' | 'bottom';
  options: Partial<{
    enableToggle: boolean; // 支持打开收起
    defaultTitle?: string; // 默认标题
    width?: number; // 宽度
    opened?: boolean; // 是否打开
    style?: React.CSSProperties;
  }>;
  children?: React.ReactNode;
  components?: IWidgetProps[]; // 子组件，
}
```

### controls 地图控件

配置 control，可以配置任意多个 control，自定义业务控件，目前支持 8 个方位。


```ts
type ControlPostions =
  | 'bottomleft'
  | 'bottomright'
  | 'topleft'
  | 'topright'
  | 'topcenter'
  | 'bottomcenter'
  | 'leftcenter'
  | 'rightcenter';
```

controls 配置示例

```ts
 {
   controls: [
      {
        display: true,
        position: 'topleft',
        type: 'mapStyle',
        title: '地图样式',
      },
      {
        display: true,
        position: 'topright',
        type: 'controlPosition',
        title: '组件控制',
        
      },
    ],
 }

```

<code src='./demo/control.tsx'>

### layer 图层布局


### 完整配置示例

```ts pure
{
  global: {
    filterData: [],
    areaCode: '330100',
    view: 'task',
  },
  widgets: {
    citySelect: {
      options: { data: CityList },
      value: ['330000', '330100'],
    },
  },
  headerbar: {
    display: true,
    options: {
      title: {
        value: '数据分析',
        display: true,
      },
    },
    components: [
      {
        display: true,
        position: 'left',
        title: '选择城市',
        type: 'citySelect',
      },
    ],
  },
  panel: {
    display: true,
    options: {
      enableToggle: true,
      defaultTitle: '所有网格',
      opened: true,
      width: 426,
    },
    position: 'right',
    components: [
      {
        display: true,
        type: 'meshName',
        title: '网格名称',
      },
      {
        display: true,
        type: 'meshchart',
        title: '所有网格数据',
      },
      {
        display: true,
        type: 'panelTabContent',
        title: '所有网格',
        components: [
          {
            display: true,
            type: 'mesh_indicator',
            title: '业务数据',
          },
          {
            type: 'total_data_panel',
            title: '人员数据',
          },
        ],
      },
    ],
  },
  toolbar: [{
    display: false,
    components: [],
  }],
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
  controls: [
    {
      display: true,
      position: 'topleft',
      layout: 'horizontal',
      type: 'filter',
      title: '筛选',
    },
    {
      display: true,
      position: 'bottomright',
      type: 'location',
      layout: 'vertical',
      title: '定位',
    },
    {
      display: true,
      position: 'bottomright',
      type: 'mapStyle',
      layout: 'vertical',
      title: '地图样式',
    },
    {
      display: true,
      position: 'topleft',
      type: 'searchPlaces',
      layout: 'horizontal',
      title: '地区搜索',
    },
    {
      display: true,
      position: 'topleft',
      type: 'select',
      options: {},
    },
  ],
  popup: {
    enable: false,
  },
  layers: [
    {
      type: 'gridLayer',
      options: {},
    },
  ],
}


```