const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')  // 压缩css
const CopyPlugin = require('./plugin/copyPlugin.js');

const isProduction = process.env.NODE_ENV === 'production'
// 处理css的loader
const handleCssLoaders = (loader) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader", {
      // 配合package.json中的browserslist 
      // 处理兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugin: ['postcss-preset-env']  // 解决大多数样式兼容性问题
        }
      }
    },
    loader
  ].filter(Boolean)
}

// console.log(isProduction);
module.exports = {
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  entry: {
    AutoScroll: './src/components/common/AutoScroll',
    Layout: './src/components/common/Layout',
    utils: './src/utils/index.ts',
    websocket: './src/websocket/websocket.ts'
  },
  output: {
    path: isProduction ? path.resolve(__dirname, 'lib') : undefined,
    // 出口文件
    filename: isProduction ? '[name]/index.js' : 'static/js/[name].js',
    // chunk文件
    chunkFilename: isProduction ? 'static/js/[name].[contenthash:10].chunk.js' : 'static/js/[name].chunk.js',
    // 资源文件
    assetModuleFilename: 'static/media/[hash:10][ext][query]',
    clean: true,
    libraryTarget: 'umd', // 采用通用模块定义
    libraryExport: 'default', // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
  },
  externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: 'react',
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.(tsx|ts|js?x)$/,
          include: path.resolve(__dirname, './src'),
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            // 开启缓存
            cacheDirectory: true,
            // 关闭压缩
            cacheCompression: false,
            plugins: [
              !isProduction && "react-refresh/babel", // 开启js的HMR功能
            ].filter(Boolean),
          }
        },
        {
          test: /\.css$/,
          use: handleCssLoaders()
        },
        {
          test: /\.less$/,
          use: handleCssLoaders('less-loader')
        },
        // 处理图片
        {
          test: /\.(jpe?g|png|gif|webp|svg)$/,
          type: "asset",
          parser: {
            // 将图片资源转为base64
            dataUrlCondition: {
              maxSize: 10 * 1024
            }
          }
        },
        // 处理其他资源
        {
          test: /\.(woff2?|ttf)$/,
          type: "asset/resource"
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    extensions: ['.js', '.tsx', '.ts'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.min.css'
    }),
    new CopyPlugin(
      {
        from: path.resolve('./src/components/common'),
        to: path.resolve('./lib'),
        reg: /.d.ts$|^index\.js$|^index\.css$/
      },
    )
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    minimizer: [
      isProduction && new TerserPlugin({
        parallel: true,
      }),
      isProduction && new CssMinimizerPlugin()
    ].filter(Boolean),
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
}
