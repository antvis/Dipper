import React, { useEffect, useRef, useState } from 'react';
import { Line } from '@antv/g2plot';
import { ChatData } from '../Bar';

export function LineCahrt({ data }: ChatData) {
  const id = useRef();
  const [lineplot, setLinePlot] = useState<Line>();
  // const [list,setData] = useState([])

  // useEffect(()=>{
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setData(data);
  //   });
  // },[])

  useEffect(() => {
    if (!lineplot && id.current && data) {
      const lineplot = new Line(id.current, {
        data,
        autoFit: true,
        xField: 'xField',
        yField: 'yField',
        seriesField: 'series',
        legend: {
          position: 'top-left',
        },
      });
      lineplot.render();
      setLinePlot(lineplot);
    } else {
      lineplot.update({
        data,
      });
    }
  }, [id.current, data]);

  return <div ref={id} style={{ height: 300 }} />;
}
