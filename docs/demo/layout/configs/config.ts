import { IConfig } from '@antv/dipper';
import { CityList } from './mock';
export const config: Partial<IConfig> = {
  viewData: {
    global: {
      filterData: [],
      areaCode: '330100',
      view: 'task',
    },
    widgets: {
      citySelect: {
        options: CityList,
        value: ['330000', '330100'],
      },
    },
  },
  toolbar: {
    display: true,
    childrens: [
      {
        display: true,
        position: 'left',
        type: 'citySelect',
      },
    ],
  },
  headerbar: {
    display: true,
    title: {
      value: '布局测试',
      display: true,
    },
    childrens: [
      {
        display: true,
        position: 'left',
        type: 'citySelect',
      },
      {
        display: true,
        position: 'center',
        type: 'mapStyle',
      },
      {
        display: true,
        position: 'right',
        type: 'mapStyle',
      },
    ],
  },
  map: {
    zoom: 10,
    center: [120.153576, 30.287459],
    pitch: 0,
    style: 'normal',
  },
};
