---
title: 布局
mobile: true
order: 0
nav:
  title: 移动端
  order: 0
---

```tsx
/**
 *
 * defaultShowCode: true
 */
import React from 'react';
import { registerWidget, DipperMobileContainer } from '@antv/dipper-mobile';
import { SearchBar, Tabs, Dropdown } from 'antd-mobile';
const searchBar = () => {
  return <SearchBar placeholder="请输入内容" />;
};
const tabs = () => {
  return (
    <Tabs>
      <Tabs.Tab title="水果" key="fruits" />
      <Tabs.Tab title="蔬菜" key="vegetables" />
      <Tabs.Tab title="动物" key="animals" />
    </Tabs>
  );
};
const dropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Item key="sorter" title="排序">
        <div style={{ padding: 12 }}>
          排序内容
          <br />
          排序内容
          <br />
          排序内容
          <br />
          排序内容
          <br />
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="bizop" title="商机筛选">
        <div style={{ padding: 12 }}>
          商机筛选内容
          <br />
          商机筛选内容
          <br />
          商机筛选内容
          <br />
        </div>
      </Dropdown.Item>
      <Dropdown.Item key="more" title="更多筛选">
        <div style={{ padding: 12 }}>
          更多筛选内容
          <br />
          更多筛选内容
          <br />
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
};

registerWidget('searchBar', searchBar);
registerWidget('tabs', tabs);
registerWidget('dropdown', dropdown);

export default function RumbMap() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
      }}
    >
      <DipperMobileContainer
        cfg={{
          headerbar: {
            display: false,
            options: {
              title: {
                value: 'XX 管理地图地图',
                display: true,
              },
            },
            components: [],
          },
          map: {
            zoom: 3,
          },
          panel: {
            display: true,
          },
          toolbar: {
            display: true,
            components: [
              {
                type: 'dropdown',
                position: 'left',
              },
            ],
          },
        }}
      />
    </div>
  );
}
```

<API hideTitle src='@antv/dipper-mobile/src/layout/index.tsx'></API>
