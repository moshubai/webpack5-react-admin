// const { basePath, srcDir } = require('../src/setting')
// const path = require('path')
// exports.resolve = dir => path.join(__dirname, '..', dir)

// const inProject = path.resolve.bind(path, basePath)
// exports.inProjectSrc = (file) => inProject(srcDir, file)




const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  public: path.resolve(__dirname, '../public'),

  styles: path.resolve(__dirname, '../src/styles'),

  resolve: (dir) => path.join(__dirname, '..', dir),

  bableConfig: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 2, // polyfill 需要使用@babel/runtime-corejs2
            useBuildIns: 'usage', // 按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
          }
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }], // 装饰器
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css'
        }]
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: [
                '> 1%',
                'last 2 versions',
                'not ie <= 8'
              ]
            }
          }
        ],
        '@babel/preset-react'
      ],
    }
  }
}









// es6 => es5

// exports.bableConfig = {
//   loader: 'babel-loader',
//   options: {
//     cacheDirectory: true,
//     plugins: [
//       [
//         '@babel/plugin-transform-runtime',
//         {
//           corejs: 2, // polyfill 需要使用@babel/runtime-corejs2
//           useBuildIns: 'usage', // 按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
//         }
//       ],
//       ['@babel/plugin-proposal-decorators', { legacy: true }], // 装饰器
//       ['@babel/plugin-proposal-class-properties', { loose: true }],
//       ['import', {
//         libraryName: 'antd',
//         libraryDirectory: 'es',
//         style: 'css'
//       }]
//     ],
//     presets: [
//       [
//         '@babel/preset-env',
//         {
//           modules: false,
//           targets: {
//             browsers: [
//               '> 1%',
//               'last 2 versions',
//               'not ie <= 8'
//             ]
//           }
//         }
//       ],
//       '@babel/preset-react'
//     ],
//   }
// }
