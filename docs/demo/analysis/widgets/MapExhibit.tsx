import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Switch } from "antd";
import React from "react";

export function MapExhibit() {
  const onChange = (e) => {
    console.log(e)
  }
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{marginRight:50}}>地图放大展示分配人员</div>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div>
        地图展示<DownOutlined />
      </div>
    </Dropdown>
  )
}
