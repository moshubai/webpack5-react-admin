const NODE_ENV = process.env.NODE_ENV || 'development'
const port = '8909'
const hostConfig = {
  test: 'http://192.168.0.172:8888/',
  dev: 'http://192.168.0.172:8888/',
  prod: 'http://192.168.0.172:8888/'
}
let proxyHost = ''
switch (NODE_ENV) {
  case 'production':
    proxyHost = hostConfig.prod
  case 'test':
    proxyHost = hostConfig.test
  default:
    proxyHost = hostConfig.dev
}
module.exports = {
  port,
  env: NODE_ENV,
  basePath: __dirname,
  srcDir: 'src',
  main: 'main',
  outDir: 'dist',
  externals: {},
  globals: {},
  verbose: false,
  vendors: [
    'react',
    'react-dom',
    'react-router-dom'
  ],
  proxyHost,
  cookiesExpires: 1, // Cookies 默认保存时间，单位：天
}
