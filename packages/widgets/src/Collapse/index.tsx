import React from 'react';
import { Collapse } from 'antd';
import styles from './index.less';
import { CustomBaseLayout } from '..';
import { IWidgetProps } from '@antv/dipper-core';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface DipperCollapseProps {
  type: string;
  title: string;
  childrens: IWidgetProps[];
}

export function DipperCollapse({
  type,
  childrens,
  title,
}: DipperCollapseProps) {
  return (
    <Collapse
      ghost
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      <Panel header={<div className={styles['overview']}>{title}</div>} key="1">
        <CustomBaseLayout type={type} childrens={childrens}></CustomBaseLayout>
      </Panel>
    </Collapse>
  );
}
