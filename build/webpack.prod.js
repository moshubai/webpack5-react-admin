const webpack = require('webpack')
const { merge } = require('webpack-merge')
const commonJs = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const util = require('./util')

// const SpeedMeasureWebpack5Plugin = require("speed-measure-webpack-plugin");
// const smw = new SpeedMeasureWebpack5Plugin();


const prodWebpack = merge(commonJs, {
  // 指定构建环境
  mode: 'production',
  devtool: 'source-map',

  // 出口
  output: {
    path: util.resolve('/dist'),
    filename: 'js/[name].[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              sassOptions: {
                indentWidth: 4,//??
                includePaths: [
                  util.inProjectSrc('styles'),
                ]
              }
            },
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    usedExports: true,
    minimizer: [
      // mini js
      new TerserPlugin({
        parallel: true, // 多进程并发运行以提高构建速度
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            // 删除⽆⽤的代码
            unused: true,
            // 删掉 debugger
            drop_debugger: true, // eslint-disable-line
            // 移除 console
            drop_console: true, // eslint-disable-line
            // 移除⽆⽤的代码
            dead_code: true // eslint-disable-line
          },
          mangle: true,
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
      // mini css
      new CssMinimizerPlugin({})
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // html模板的生成路径
      template: util.inProjectSrc('index.html'), // html模板
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      hash: true, // 在打包的资源插入html会加上hash
      //  html 文件进行压缩
      minify: {
        removeComments: true, // 去注释
        collapseWhitespace: true, // 压缩空格
        removeAttributeQuotes: true // 去除属性引用
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
    }),

    // 确保在文件没发生改变时，contentHash也不会变化
    // new webpack.ids.HashedModuleIdsPlugin()
  ],
})

module.exports = prodWebpack// smw.wrap(prodWebpack)

