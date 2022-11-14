/**
 * 获取当前时间
 * @returns 当前时间
 */
export function getTime() {
  return new Date().toTimeString().replace(/\sGMT.*/, '');
}
