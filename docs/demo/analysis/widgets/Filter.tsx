import { Select } from "antd"
import React from "react"

const { Option } = Select

export const Filter = () => {
  return (
    <div style={{ background:'#fff',borderRadius:3 }}>
      <Select value="全部地区" style={{ width: 100,color:'rgba(0,0,0,0.65)' }} bordered={false}>
        <Option value="全部地区">全部地区</Option>
      </Select>
      <Select value="全部类型" style={{ width: 100,color:'rgba(0,0,0,0.65)' }} bordered={false}>
        <Option value="全部类型">全部类型</Option>
      </Select>
    </div>
  )
}
