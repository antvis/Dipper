import type { ScreenType, StaticCard, Option } from './type';

export const MOCK: Record<string, Option[]> = {
  1: [
    { label: '方案1', value: '方案1' },
    { label: '方案2', value: '方案2' },
    { label: '方案3', value: '方案3' },
  ],
  2: [
    { label: '全国', value: '86' },
    { label: '浙江', value: '186' },
    { label: '湖南', value: '286' },
  ],
  3: [
    { label: '全部行业', value: 'all' },
    { label: '行业1', value: '行业1' },
    { label: '行业2', value: '行业2' },
    { label: '行业3', value: '行业3' },
  ],
  4: [
    { label: '城市经理', value: 'cityManager' },
    { label: '技术', value: 'dev' },
    { label: '测试', value: 'test' },
  ],
};

export const MOCK_STATIC: StaticCard[] = [
  { title: '商户数量(个)', value: 1623 },
  { title: '0-9天商户动销数(个)', value: 774 },
  { title: '10-19天商户动销数(个)', value: 90 },
  { title: '20-31天商户动销数(个)', value: 767 },
  { title: '7天日均交易笔数(笔)', value: 956 },
  { title: '30天日均交易笔数(笔)', value: 772 },
  { title: '商户密度', value: 0.7, unit: '%' },
  { title: '支付商家占比', value: 0.45, unit: '%' },
];

export const MOCK_SCREENRODI: ScreenType[] = [
  { label: '普通筛选', value: '普通筛选' },
  { label: '漏斗筛选', value: '漏斗筛选' },
];

export const MockLayers: Option[] = [
  { label: 'AOI 图层', value: '1' },
  { label: 'xxx图层', value: '2' },
];

export function fakePromise<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}
