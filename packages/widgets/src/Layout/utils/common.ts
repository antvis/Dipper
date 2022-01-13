export function getEnv(url: string) {
  if (url.indexOf('alipay.net') !== -1) {
    return 'dev';
  }
  if (url.indexOf('pre') !== -1) {
    return 'pre';
  }
  return 'prod';
}

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
