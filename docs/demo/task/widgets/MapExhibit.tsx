import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Switch } from "antd";
import React from "react";

export function MapExhibit() {
  const onChange = (e) => {
    // TODO 根据业务实现
    console.log(e)
  }
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ marginRight: 50 }}>地图放大展示分配人员</div>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div style={{
        borderLeft: '1px solid #f3f3f3',
        borderRight: '1px solid #f3f3f3',
        padding: '0 10px',
        height: 20,
        lineHeight: '20px'
      }}>
        地图展示<DownOutlined />
      </div>
    </Dropdown>
  )
}
