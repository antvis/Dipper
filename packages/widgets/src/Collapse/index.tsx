import React from 'react';
import { Collapse } from 'antd';
import styles from './index.less';
import { CustomBaseLayout } from '@antv/dipper-layout';
import { IWidgetProps } from '@antv/dipper-core';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface DipperCollapseProps {
  type: string;
  title: string;
  children: IWidgetProps[];
}

export function DipperCollapse({ type, children, title }: DipperCollapseProps) {
  return (
    <Collapse
      ghost
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      defaultActiveKey={['1']}
    >
      <Panel header={<div className={styles['overview']}>{title}</div>} key="1">
        <CustomBaseLayout type={type} components={children}></CustomBaseLayout>
      </Panel>
    </Collapse>
  );
}
