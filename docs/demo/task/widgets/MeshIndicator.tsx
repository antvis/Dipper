import React from 'react';
import { BarChart } from '../components/Bar';
import { PieChart } from '../components/Pie';
import { useState, useEffect } from 'react';
import { randomData, chartList } from '../configs/mock';

export function MeshIndicator() {
  const [chartData, setChartData] = useState([]);

  // mockjs 不支持fetch 所以就不mock 网络请求了
  useEffect(() => {
    (async () => {
      const allfetch = ['bar', 'pie'].map(() => {
        return randomData(chartList);
      });
      const res = await Promise.all(allfetch);
      const title = ['行业分布', '行业市场份额'];
      const list = res.map((item, index) => {
        return {
          title: title[index],
          data: item.data.list,
        };
      });
      setChartData(list);
    })();
  }, []);
  return (
    <>
      {chartData.length &&
        chartData.map((item) => {
          return (
            <div key={Math.random()} style={{ marginBottom: 20 }}>
              <h4>{item.title}</h4>
              {item.title === '行业分布' ? (
                <BarChart data={item.data} />
              ) : (
                <PieChart data={item.data} />
              )}
            </div>
          );
        })}
    </>
  );
}
