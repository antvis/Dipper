import { Col, Row } from 'antd';
import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { formatNumber } from '../util/format';

interface StaticCard {
  title: string;
  value: number;
  unit?: '' | '%';
}

interface StatisticCardsProps {
  children: StaticCard[];
}

export function StatisticCards({ children }: StatisticCardsProps) {
  return (
    <Row>
      {children.map((child, index) => (
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
