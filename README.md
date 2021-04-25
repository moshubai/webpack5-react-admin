## webpack5搭建react 项目框架，实践及优化

### 搭建前准备
1. 安装webpack5。(下列命令均为yarn，也可换npm install)
```js
yarn init -y
yarn add -D webpack webpack-cli 
yarn add react react-dom
```
2. 创建文件夹和文件，结构如下图

3. 补充`index.html`和`main.js`文件内容
```js
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack5</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>

```
```js
// main.js
import React from 'react'
import ReactDOM from 'react-dom'
const EL = document.getElementById('root')
ReactDOM.render(5555555555, EL)
```
