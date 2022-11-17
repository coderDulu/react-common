
/**
 * 将对象的值转为字符串
 * @param obj 需要处理的对象
 * @returns 
 */
export function objValToStr(obj: any) {
  const newObj = JSON.parse(JSON.stringify(obj));

  if(!(newObj instanceof Object)) return;

  for (const key in obj) {
    newObj[key] += ''
  }
  return newObj;
}
