import { Col, Row } from 'antd';
import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { formatNumber } from '../util/format';

export interface StaticCard {
  title: string;
  value: number;
  unit?: '' | '%';
}

interface StatisticCardsProps {
  childrens: StaticCard[];
}

export function StatisticCards({ childrens }: StatisticCardsProps) {
  // 响应 筛选器变化
  // service 发送一个事件
  // service updateValue
  return (
    <Row>
      {childrens.map((child, index) => (
        <Col key={index} span={!index ? 24 : 12}>
          <StatisticCard
            statistic={{
              title: child.title,
              value: formatNumber(child.value, child.unit),
            }}
          />
        </Col>
      ))}
    </Row>
  );
}
