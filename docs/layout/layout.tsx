import React from "react";
import { Layout } from "antd";
import 'antd/dist/antd.css'

const { Header, Content, Sider } = Layout

export default function Layouts() {
  return (
    <div >
      <Layout style={{ height: 300 }}>
        <Header style={{ color: "#fff" }}>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Sider theme="light">Sider</Sider>
        </Layout>
      </Layout>
    </div>
  )
}
