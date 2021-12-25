import React, { useState } from 'react';
import type { ILayerGroup } from '@antv/dipper-core';
import { Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export default function LayerItem(props: Record<string, any>) {
  const { item, onChange } = props;
  const [visible, setVisible] = useState(item.visible);
  const changeVisible = function (item: ILayerGroup) {
    setVisible(!visible);
    onChange(item);
  };
  return (
    <div>
      <Button
        icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        onClick={() => changeVisible(item)}
      ></Button>
      <span>{item.name}</span>
    </div>
  );
}
