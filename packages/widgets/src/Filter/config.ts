export const config = {
  type: 'cascader',
  code: 'areaList',
  filterType: 'all',
  position: 'header',
  placeholder: '全国',
  data: {
    from: 'initData',
    field: 'areaVOList',
    defaultValue: 'areaCode',
    url: 'https://gw.alipayobjects.com/os/bmw-prod/551e3ca6-6dad-421b-a8b4-b225e47f73ca.json',
  },
  fetchAPI: {
    type: 'common',
    metod: 'get',
    url: 'https://gw.alipayobjects.com/os/bmw-prod/551e3ca6-6dad-421b-a8b4-b225e47f73ca.json',
    format: (result: any) => {
      return result;
    },
  },
};
