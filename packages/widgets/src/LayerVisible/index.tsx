import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './index.less';
import type { ILayerGroup } from '@antv/dipper-core';
import { useLayerService } from '@antv/dipper-layout';
import LayerItem from './LayerItem';
interface ILayerItem extends ILayerGroup {
  visible: boolean;
}
export function LayerVisible() {
  const [checkLayerShow, setCheckLayerShow] = useState(false);
  function onChange(item: ILayerItem) {
    item.visible ? item.hide() : item.show();
  }
  const { layerService } = useLayerService();
  const layerStore = layerService.getLayerStore();
  return (
    <div className={styles.layerlist}>
      <Button
        icon={<EyeOutlined style={{ color: '#8e8e8e' }} />}
        onClick={() => setCheckLayerShow(!checkLayerShow)}
      />
      {checkLayerShow && (
        <div className={styles.layerSelect} style={{ backgroundColor: '#fff' }}>
          {layerStore &&
            layerStore.map((item: any) => {
              return (
                <LayerItem key={item.id} item={item} onChange={onChange} />
              );
            })}
        </div>
      )}
    </div>
  );
}
