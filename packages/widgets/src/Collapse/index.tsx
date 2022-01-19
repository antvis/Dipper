import React from 'react';
import { Collapse } from 'antd';
import styles from './index.less';
import { CustomBaseLayout } from '..';
import { IWidgetProps } from '@antv/dipper-core';

const { Panel } = Collapse;

interface DipperCollapseProps {
  type: string;
  childrens: IWidgetProps[];
}

export function DipperCollapse({ type, childrens }: DipperCollapseProps) {
  return (
    <Collapse ghost>
      <Panel header={<div className={styles['overview']}>概况</div>} key="1">
        <CustomBaseLayout type={type} childrens={childrens}></CustomBaseLayout>
      </Panel>
    </Collapse>
  );
}
