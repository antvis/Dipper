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
        height: '300px',
        width: '100%',
      }}
    >
      <DipperMobileContainer
        cfg={{
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
