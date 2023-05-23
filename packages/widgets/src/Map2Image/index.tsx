import { useSceneValue } from '@antv/l7-react';
import { Button } from 'antd';
import React from 'react';
import style from './index.less';

export function Map2Image() {
  const scene = useSceneValue();
  const exportIcon =
    'https://gw.alipayobjects.com/zos/bmw-prod/2fd1468d-6187-4a40-8c84-52ade1c39668.svg';
  // 图片导出事件
  const onClickHandle = () => {
    const images = scene.exportPng('png');
    const taga = document.createElement('a');
    const image = new Image();
    images.then((res) => (image.src = res));
    taga.download = `L7-Dipper-${new Date().getTime()}.png`;
    taga.href = image.src;
    taga.click();
  };

  return (
    <Button icon={<img className={style.exportIcon} src={exportIcon} />} onClick={onClickHandle} />
  );
}
