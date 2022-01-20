export function legendFormat(value: number) {
  if (value < 1) {
    return;
  }
}

/**
 * 格式化数字
 * @param value 数值
 */
function formatValue(value?: number | string | null) {
  if (
    value == null ||
    value !== value ||
    Number.isNaN(+value) ||
    value === 'null'
  ) {
    return '-';
  }

  // eslint-disable-next-line no-param-reassign
  value = +value;
  const [integer] = (value + '').split('.');
  const integerLen = integer.length;
  switch (integerLen) {
    case 1:
    case 2:
    case 3:
    case 4:
      return Number.isInteger(value) ? value : value.toFixed(2);
    case 5:
    case 6:
    case 7:
    case 8:
      return (value / Math.pow(10, 4)).toFixed(2) + '万';

    case 9:
    default:
      return (value / Math.pow(10, 8)).toFixed(2) + '亿';
  }
}

/**
 * 百分比格式化
 * @param value 数值
 */
function formatPercent(value?: number | string | null) {
  if (value !== value || value == null || Number.isNaN(+value)) {
    return '-';
  }

  return (+value * 100).toFixed(Number.isInteger(+value * 100) ? 0 : 2) + '%';
}

export function formatNumber(value?: number | string | null, unit?: '' | '%') {
  return unit === '%' ? formatPercent(value) : formatValue(value);
}
