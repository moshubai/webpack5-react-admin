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
        // test: /\.(sa|sc|c)ss$/,
        test: /\.(scss|css)$/,
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
            loader: 'sass-loader', options: {
              sourceMap: true,//     includePaths: [
              //       // util.inProjectSrc('styles'),
              //     ]

            }
          },
          
        ]
      },
    ]
  },
  devtool: 'source-map', // inline把js打包在一个文件里面 hidden分离出来 eval也是分离
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


