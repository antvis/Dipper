import { set, cloneDeep } from 'lodash';

export const updateConfigsField = (source: any, key: string, value: any) => {
  const clone = cloneDeep(source); // 去除深拷贝
  return set(clone, key, value);
};
