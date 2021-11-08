import React,{ useEffect,useRef,useState } from 'react'
import { Bar } from '@antv/g2plot'

export function MeshIndicator() {
  const id = useRef(`bar-container-${Math.random()}`);
  const [barplot,setBarplot] = useState<Bar>()
  const data = [
    { year: '金融保险', value: 38 },
    { year: '医疗卫生', value: 52 },
    { year: '社会公共管理', value: 61 },
    { year: 'IT 通讯电子', value: 145 },
    { year: '教育', value: 48 },
  ];

  useEffect(()=>{
    if (!barplot) {
      const bar = new Bar(id.current, {
        data,
        autoFit:true,
        xField: 'value',
        yField: 'year',
        legend: {
          position: 'top-left',
        },
      });

      bar.render();
      setBarplot(bar)


    }
  },[])

  console.log('id.curren',id.current)

  return(
    <div id={id.current} />
  )
}
