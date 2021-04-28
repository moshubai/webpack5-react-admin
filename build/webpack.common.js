const ip = require('ip')
// const path = require('path')
const webpack = require('webpack')
const paths = require('./util')
const { globals, env, port } = require('../src/setting')

// const PnpWebpackPlugin = require('pnp-webpack-plugin')

const __DEV__ = env === 'development'
const __TEST__ = env === 'test'
const __PROD__ = env === 'production'
const publicPath = __DEV__ ? '/' : './'

module.exports = {
  // 入口
  entry: {
    main: [paths.src + '/main.js'],
  },
  // 出口
  output: {
    publicPath, // 打包后的资源的访问路径前缀
    clean: true,
  },

  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3, // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,

            }
          }
        ],
        exclude: '/node_modules/', // 屏蔽不需要处理的文件（文件夹）（可选）
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        // type: 'asset/resource',
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // 小于这个大小的图片将使用内敛的方式，不会打包出文件 默认是 8 * 1024
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.jpg', '.png'],
    alias: {
      '@': paths.src,
      pages: paths.resolve('src/pages'),
      routes: paths.resolve('src/routes'),
      layout: paths.resolve('src/page-layout'),
      components: paths.resolve('src/components'),
      func: paths.resolve('src/func'),
      style: paths.resolve('src/styles'),
      Api: paths.resolve('src/api/index'),
      // mobx: paths.resolve('/node_modules/mobx/lib/mobx.es6.js')
      // react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      // 'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    },
    modules: [
      paths.src, // 指定当前目录下的 node_modules 优先查找
      'node_modules', // 将默认写法放在后面
    ],
    // add pnp
    plugins: [
      // PnpWebpackPlugin
    ]
  },
  optimization: {
    // runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        },
        // 其他同步加载公共包
        commons: {
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          priority: 80,
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
      __DEV__,
      __TEST__,
      __PROD__,
      ...globals
    })
  ],

}
