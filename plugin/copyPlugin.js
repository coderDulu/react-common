// import { validate } from 'schema-utils';
const { validate } = require('schema-utils')
const fs = require('fs')
const childProcess = require('child_process')
const os = require('os')
const path = require('path')
// 选项对象的 schema
// const schema = {
//   type: 'object',
//   properties: {
//     test: {
//       type: 'string',
//     },
//   },
// };
const isWindow = /win/.test(os.platform());

class copyPlugin {
  constructor(options = {}) {
    const { from, to, reg } = options
    this.from = from
    this.to = to
    this.reg = reg
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('CopyWebpackPlugin', (complication) => {
      const { from, to } = this;

      if (!fs.existsSync(from)) {
        throw new Error('from is not found')
      }
      // fs.copyFile(from, to, err => {
      //   if(err) throw err;
      // })
      if (this.reg) {
        fs.readdir(from, 'utf-8', (err, files) => {
          if (err) throw new Error('from is not found');
          // console.log(files);
          files.forEach(file => {
            if (this.reg.test(file)) {   // 符合规则开始复制文件
              const command = isWindow ? `xcopy ${path.resolve(from, file)} ${to}` : `cp -r ${path.resolve(from, file)} ${to}`
              childProcess.execSync(command);
            }
          })
        })
      } else {
        const command = isWindow ? `xcopy ${from} ${to}` : `cp -r ${from} ${to}`
        childProcess.execSync(command)
      }
    })
  }
}

module.exports = copyPlugin;