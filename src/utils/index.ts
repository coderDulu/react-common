const utils = {}
const modules = require.context('.', true, /\.ts$/);


// 自动注册utils文件夹下面的js文件
modules.keys().forEach((key: string) => {
  const fileModule = modules(key);
  if(!/index/.test(key)) {
    Object.assign(utils, fileModule);
  }
})

export default utils;
