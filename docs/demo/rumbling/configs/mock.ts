import Mock from "mockjs"

export const chartList = Mock.mock({
  // 生成长度在 0~32 之间的小写字母
  success: '@string("lower", 0, 32)',
  // 生成长度在 0~32 之间的小写字母
  errorMessage: '@string("lower", 0, 32)',
  data: {
    'list|4-7': [
      {
        // 生成长度在 100~1000 之间的小写字母
        xField: '@integer(100,1000)',
        // 生成长度在 3~5 之间的中文
        yField: '@ctitle(3, 5)',
      },
    ],
  },
})

export function randomData<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}




export const CityList = [
  {
    value: '330000',
    areaLevel: 'province',
    label: '浙江省',
    children: [
      {
        value: '330100',
        areaLevel: 'city',
        label: '杭州市',
        children: [],
      },
    ],
  },
  {
    value: '110000',
    areaLevel: 'province',
    label: '北京市',
    children: [
      {
        value: '110000',
        areaLevel: 'city',
        label: '北京市',
        children: [],
      },
    ],
  },
  {
    value: '120000',
    areaLevel: 'province',
    label: '天津市',
    children: [
      {
        value: '120000',
        areaLevel: 'city',
        label: '天津市',
        children: [],
      },
    ],
  },
  {
    value: '310000',
    areaLevel: 'province',
    label: '上海市',
    children: [
      {
        value: '310000',
        areaLevel: 'province',
        label: '上海市',
        children: [],
      },
    ],
  },
  {
    value: '440000',
    areaLevel: 'province',
    label: '广东省',
    children: [
      {
        value: '440100',
        areaLevel: 'city',
        label: '广州市',
        children: [],
      },
      {
        value: '440300',
        areaLevel: 'city',
        label: '深圳市',
        children: [],
      },
      {
        value: '440400',
        areaLevel: 'city',
        label: '珠海市',
        children: [],
      },
      {
        value: '440600',
        areaLevel: 'city',
        label: '佛山市',
        children: [],
      },
      {
        value: '441300',
        areaLevel: 'city',
        label: '惠州市',
        children: [],
      },
      {
        value: '441900',
        areaLevel: 'city',
        label: '东莞市',
        children: [],
      },
      {
        value: '442000',
        areaLevel: 'city',
        label: '中山市',
        children: [],
      },
    ],
  },
  {
    value: '130000',
    areaLevel: 'province',
    label: '河北省',
    children: [
      {
        value: '130100',
        areaLevel: 'city',
        label: '石家庄市',
        children: [],
      },
      {
        value: '131000',
        areaLevel: 'city',
        label: '廊坊市',
        children: [],
      },
    ],
  },
];
