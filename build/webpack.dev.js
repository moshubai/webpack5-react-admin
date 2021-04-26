const { merge } = require('webpack-merge')
const commonJs = require('./webpack.common')
const util = require('./util')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')



module.exports = merge(commonJs, {
  // 打包模式
  mode: 'development',
  // 入口
  entry: {
    main: [util.inProjectSrc('main')],
  },
  // 出口
  output: {
    path: util.resolve('dist'),
    filename: 'js/[name].[hash].js',
  },
  // 模块化
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: true },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                indentWidth: 4,//??
                includePaths: [
                  util.inProjectSrc('styles'),
                ]
              }

            }
          },

        ]
      },
    ]
  },
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    name: 'development-cache',
  },
  devtool: 'eval-cheap-module-source-map', // inline把js打包在一个文件里面 hidden分离出来 eval也是分离
  // 组件
  plugins: [
    new HtmlWebpackPlugin({
      template: util.inProjectSrc('index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
      },
    }),

    // new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin()
  ],

})


