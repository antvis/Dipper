---
title: Dipper 入门
order: 2
mobile: false
group:
  title: 基础使用
nav:
  title: 指南
  order: 1
---

## 初始化

### 安装依赖

```bash
npm i @antv/l7 @antv/l7-react @antv/dipper
```

### 初始化地图

在 PC 端可以引入 `DipperContainer` 容器实现地图的初始化。

```tsx
/**
 *
 * defaultShowCode: true
 */
import React, { useEffect, useState } from 'react';
import { DipperContainer, IConfig } from '@antv/dipper';

export default function Map() {
  return (
    <div style={{ height: '350px' }}>
      <DipperContainer cfg={{}} />
    </div>
  );
}
```

### 默认配置

DipperContainer 是地图容器，我们需要使用配置项控制 Dipper 渲染的组件。上面示例中我们传了空的配置，也实例化了地图，因为 DipperConainer 使用了默认配置,默认配置如下：

```ts
 {
    headerbar: { // 导航条
        display: true,
        options: {
        logo: {
            display: true,
            value: 'https://antv-2018.alipay.com/assets/image/icon/l7.svg',
            style: {
            height: '24px',
            width: '24px',
            },
        },
        title: {
            url: './',
            value: 'XX 管理系统',
            display: true,
        },
        },
        components: [],
  },
  toolbar: [ // 工具条
        {
        display: false,
        components: [],
        },
  ],
  mapType: 'GaodeV1',// 地图类型
  map: { // 地图 配置
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
  panel: {}, // 信息框
  controls: [ // 业务自定义控件
    {
      display: true,
      position: 'topleft',
      type: 'mapStyle',
    },
    {
      display: true,
      position: 'bottomright',
      type: 'location',
    },
  ],
  defaultcontrols: [ // L7 默认控件
    {
      type: 'zoom',
      position: 'bottomright',
      display: true,
    },
    {
      type: 'scale',
      position: 'bottomleft',
      display: true,
    },
  ],
  popup: {
    enable: false,
  },
  layers: [],
  legends: [],
 }

```

### 默认布局

Dipper Container 为地图提供的 默认的布局.

![默认布局](https://gw.alipayobjects.com/mdn/rms_08cc33/afts/img/A*RXdiSJZ896wAAAAAAAAAAAAAARQnAQ)

默认布局包括

- 导航条 headbar
- 工具条 toolbar
- 信息面板 panel
- 控件 controls
- 图层 layers

布局的各个部分都为可选项，根据需要进行配置。

实际业务中可以根据业务需求将组件放置地图对应的布局位置。

## 自定义开发

### 自定义配置

Dipper 会将自定义配置与默认配置会进行合并,通过配置文件修改应用 title

```tsx
/**
 *
 * defaultShowCode: true
 */
import React, { useEffect, useState } from 'react';
import { DipperContainer, IConfig } from '@antv/dipper';

export default function Map() {
  return (
    <div style={{ height: '350px' }}>
      <DipperContainer
        cfg={{
          headerbar: {
            // 导航条
            options: {
              title: {
                value: '这是个测试系统',
                display: true,
              },
            },
            components: [],
          },
        }}
      />
    </div>
  );
}
```

### 添加一个组件

Dipper 通过配置的渲染组件，如何自定义一个组件。新增组件你可以和正常开发 React 组件一样的进行开发。

在地图右上角增加一个地图控件

```tsx
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;
const ControlPosition = () => {
  return (
    <Select defaultValue="topleft" style={{ width: 120 }} onChange={(e) => {}}>
      {[
        'bottomleft',
        'bottomright',
        'topleft',
        'topright',
        'topcenter',
        'bottomcenter',
        'leftcenter',
        'rightcenter',
      ].map((value: string) => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};
export default ControlPosition;
```

上面我们完成了一个 `Select` 组件，如何渲染到地图中呢？

首先我们需要使用 `registerWidget` 注册一个组件,注册组件需要为组件定义一个名字。

```tsx pure
import { registerWidget } from '@antv/dipper';
registerWidget('controlPosition', ControlPosition);
```

注册完成,即可在在配置项中使用组件了，组件我们可以放置任意的布局组件中

```tsx
import React, { useEffect, useState } from 'react';
import { DipperContainer, IConfig, registerWidget } from '@antv/dipper';
import { Select } from 'antd';
const { Option } = Select;
const ControlPosition = () => {
  return (
    <Select defaultValue="topleft" style={{ width: 120 }} onChange={(e) => {}}>
      {[
        'bottomleft',
        'bottomright',
        'topleft',
        'topright',
        'topcenter',
        'bottomcenter',
        'leftcenter',
        'rightcenter',
      ].map((value: string) => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};
export default function Map() {
  registerWidget('controlPosition', ControlPosition);

  return (
    <div style={{ height: '350px' }}>
      <DipperContainer
        cfg={{
          headerbar: {
            // 导航条
            options: {
              title: {
                value: '这是个测试系统',
                display: true,
              },
            },
            components: [
              {
                type: 'controlPosition',
                display: true,
                // position:'left'
              },
            ],
          },
          controls: [
            {
              display: true,
              position: 'topleft',
              type: 'mapStyle',
            },
            {
              display: true,
              position: 'bottomright',
              type: 'location',
            },
            {
              type: 'controlPosition',
              display: true,
              position: 'topright',
            },
          ],
        }}
      />
    </div>
  );
}
```

### 添加图层

图层添加可以使用 Dipper 提供的图层组件、或者 L7React、L7Plot、L7 都可以。图层组件开发和普通组件开一样，需要现注册再使用，图层组件配置在图层对象中。

```tsx pure
import { AMapScene, LoadImage, PointLayer } from '@antv/l7-react';
import {
  registerWidget,
} from '@antv/dipper';
const PointLayer = ()=>{
    return <>
     <LoadImage name="00" url="https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg"/>
      <LoadImage name="01" url="https://gw.alipayobjects.com/zos/basement_prod/30580bc9-506f-4438-8c1a-744e082054ec.svg"/>
      <LoadImage name="02" url="https://gw.alipayobjects.com/zos/basement_prod/7aa1f460-9f9f-499f-afdf-13424aa26bbf.svg"/>
        <PointLayer
          key={'2'}
          options={{
            autoFit: true,
          }}

          source={{
            data:[{
                "id": "5011000000404",
                "name": "铁路新村(华池路)",
                "longitude": 121.4316962,
                "latitude": 31.26082325,
                "unit_price": 71469.4,
                "count": 2
                }, {
                "id": "5011000002716",
                "name": "金元坊",
                "longitude": 121.3810096,
                "latitude": 31.25302026,
                "unit_price": 47480.5,
                "count": 2
                }, {
                "id": "5011000003403",
                "name": "兰溪路231弄",
                "longitude": 121.4086229,
                "latitude": 31.25291206,
                "unit_price": 55218.4,
                "count": 2
                }],
             // @ts-ignore
            parser: {
              type: 'json',
              x: 'longitude',
              y: 'latitude',
            }
          }}
          shape={{
            field: 'name',
            values: ['00', '01', '02'],
          }}
          size={{
            values: 20,
          }}
          style={{
            opacity: 1,
          }}
        />
      )}
    </>

}

// 注册图层
registerWidget('pointLayer', pointLayer);


```

配置项需要注册到 Layers 中

```tsx pure
{
  layers: [
    {
      type: 'pointLayer',
    },
  ];
}
```

### 添加信息面板组件

在地图右侧我们可能需要显示一些地图交互信息，我同样可以注册一个组件然后添加到配置中.

```tsx pure
const panelName = () => {
  return <h1>这是个文本</h1>;
};

// 注册图层
registerWidget('panelName', panelName);

// 配置项中使用
const config = {
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
        type: 'panelName',
        title: '网格名称',
      },
    ],
  },
};
```

### 完整 demo

<code src='./demo/layer.tsx'>

## 组件交互

dipper 提供了一系列 hooks 方便获取地图、图层的相关实例，或者对地图的更新

- `useConfigService`
- `useSceneService`
- `useLayerGroup`
- `useWidget`
- `useDipperContainer`

### 更新地图状态

`useConfigService` 主要提供了更新 Dipper 配置的方法

```ts pure
import { useConfigService } '@antv/dipper'
const { setConfig } = useConfigService();
setConfig('map.style','normal'); // 更新地图样式

```

### 更新控件属性

这块的状态主要是指 `position` 和 `display`属性

`updateControl` 方法可以用来更新地图 Control 状态

```tsx pure
import { useConfigService } '@antv/dipper'
const { updateControl } = useConfigService();
updateControl('mapStyle', { position: 'topleft' }); // 更新地图样式
```

### 获取地图实例

通过 Scene 实例我们可以灵活的控制地图，如设置中心点、平移等等

```tsx pure
import { useSceneService } '@antv/dipper'
const { scene } = useSceneService();

```

### 获取组件内部数据

实际应用中组件和组件存在关联关系，比如地图上城市选择器组件用来选择城市，地图图层根据城市选择的值显示对城市的数据.

同样 Dipper 提供了 hooks 来获取或者设置组件数据。

useWidget 方法可以根据传入的组件`id`或者`type`获取对应组件值

```tsx pure
 import { useWidget } '@antv/dipper'
 const { widgetValue } = useWidget('citySelect');

```

### 更新组件数据

如果一个组件内部的状态外部需要使用，组件数据发生变化时就需要对数据更新，这样外部才能取到数据。比如城市选择器组件，城市更新需要调用 'widget.setValue' 方法更新数据。

```tsx pure
import { IWidget, IWidgetProps } from '@antv/dipper';
const CitySelect = ({ widget }: IWidgetProps) => {
  return (
    <Select
      defaultValue="topleft"
      style={{ width: 120 }}
      onChange={(e) => {
        widget.setValue(e); // 更新数据
      }}
    >
      {['杭州市', '金华市', '台州市'].map((value: string) => {
        return (
          <Option key={value} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};
```

## 数据管理

一个应用数据的数据包括

- 全局数据
- 组件数据
  - 组件配置项 (列表组件初始化列表数据)
  - 组件选中值 (选中值等等)

Dipper 中对数据的定义

```tsx pure
interface IData {
  global?: Record<string, any>; // 全局数据
  widgets?: {
    // 组件数据
    [key: string]: {
      options?: Record<string, any> | Record<string, any>[]; // 初始化数据
      value?: Record<string, any> | Record<string, any>[]; // 结果数据
    };
  };
}
```

### 全局数据

```tsx pure
import { useGlobalModel } from '@antv/dipper';
const [globalData, setGlobalData] = useGlobalModel();
```

### Widgets 初始化数据

在应用初始化的时候，有可能需要构造组件的初始化配置项，如默认值、或者选项列表，如何设置组件数据？两种方式：

- 1、初始化时在全局配置项配置，在组件内部中消费。
- 2、组件内部独立获取或者配置数据

这里主要介绍方法 1 的使用

```tsx pure
{
    widgets:{
        citySelect: {
        options: {data:CityList},
        value: ['330000', '330100'],
        }
    }

}
```

### Widgets 初始化数据

dipper 在加载 Widget 时会将 Widget 的实例和属性传递给 widgets

```tsx pure
import { Cascader } from 'antd';
import React from 'react';
import { IWidget, IWidgetProps } from '@antv/dipper';

export function CitySelect({
  widget,
}: IWidgetProps & {
  widget: IWidget;
}) {
  return (
    <Cascader
      defaultValue={widget?.getValue() as Array<any>} // 初始化值
      style={{ width: 180 }}
      bordered={false}
      options={(widget?.getOptions().options?.data as Array<any>) || []} // 初始值配置项
      allowClear={false}
      onChange={(e: any) => {
        widget?.setValue(e); // 更新数据
      }}
      placeholder="选择城市"
    />
  );
}
```

## 高级教程

### 自定义布局

Dipper 提供了默认布局，默认布局并不能满足所有的业务场景，这样我们就有自定义了布局。

首先看一下默认的布局

```tsx pure
export default function DipperContainer({ cfg, children, onLoad }: IContainerProps<IConfig>) {
  return (
    <DipperContainerContext cfg={cfg} onLoad={onLoad}>
      <Layout className={styles.pageMap}>
        {/* 导航栏 */}
        <DipperHeader />

        {/* 导航栏工具条 */}
        <ToolBar />

        {/* 地图区域 */}
        <MapContainer>{children}</MapContainer>
      </Layout>
    </DipperContainerContext>
  );
}
```

其实布局很简单，Dipper 会提供了 `DipperContainerContext`组件，实例化的空容器，容器内部组件可添加任意组件。

```tsx pure
import React from 'react';
import { DipperContainerContext, MapContainer } from '@antv/dipper';

const Content: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { globalConfig } = useConfigService();
  const { panel, layers, controls, toolbar, scene, mapType, map, popup } = globalConfig;
  return (
    <Layout style={{ height: '300px' }}>
      <MapContainer {...{ panel, layers, controls, scene, mapType, map, popup }}>
        {children}
      </MapContainer>
    </Layout>
  );
};

export default () => {
  return (
    <DipperContainerContext
      cfg={{
        map: {
          mapStyle: 'dark',
        },
      }}
    >
      <Content />
    </DipperContainerContext>
  );
};
```
