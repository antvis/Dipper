// 格式化城市列表
export const formatCityData = (items: any[]) => {
  return items.map((item: any) => {
    const newItem = item;
    if (newItem.subAreaVOList) {
      newItem.children = newItem.subAreaVOList;
      delete newItem.subAreaVOList;
      newItem.value = newItem.areaCode * 1;
      newItem.label = newItem.areaName;
      formatCityData(item.children);
    } else {
      newItem.value = newItem.areaCode * 1;
      newItem.label = newItem.areaName;
    }
    return newItem;
  });
};

// 查找父级
export const findSelectArray = (items: any[], code: string) => {
  let select;
  items.forEach((item: any) => {
    if (item.children) {
      const node = item.children.find((ch: any) => {
        return `${ch.value}` === `${code}`;
      });
      if (node) {
        select = [item.value, code];
      }
    }
  });
  return select || [];
};

export function updateQueryStringParameter(
  uri: string,
  key: string,
  value: string,
) {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  }
  return `${uri + separator + key}=${value}`;
}
