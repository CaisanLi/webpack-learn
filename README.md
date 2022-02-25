

#### webpack入门，就只能入门

> 当前文档基于webpack（v5.69.1）webpack-cli（v4.9.2）Nodejs（v10.13.0+）
>
> 希望学完后，想想你能用webpack做点不一样的，而不是仅文档中的内容

##### 运行逻辑

> 待完善

webpack启动后会在entry里配置的module开始递归解析entry所依赖的所有module，每找到一个module, 就会根据配置的loader去找相应的转换规则，对module进行转换后在解析当前module所依赖的module，这些模块会以entry为分组，一个entry和所有相依赖的module也就是一个chunk，最后webpack会把所有chunk转换成文件输出，在整个流程中webpack会在恰当的时机执行plugin的逻辑。




##### 概念

----

**entry（入口文件）**

`entry`既执行指示`webpack`应该使用哪个模块，来作为构建其内部的`依赖图`的开始。进入`entry`后，`webpack`会找出有哪些模块和库是`entry`（直接和间接）依赖的。默认值是`./src/index.js`。

```js
module.exports = {
  entry: './index.js'
}
```

**output（输出）**

`output`告诉`webpack`在哪里输出它所创建的`bundle(包)`，已经如何命名这些文件。主要输出文件的默认值是`./dist/main.js`

```js
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 指定输出目录
    filename: 'main.bundle.js' // 指定输出的文件名
  }
}
```

**loader**

`webpack`只能处理`javascript`和`json`文件。而`loader`可以让`webpack`去处理其它类型的文件。

```js
module.exports = {
  module: {
    rules: [{
      test: /\.txt$/, // 识别哪些文件会被转换
      use: 'raw-loader' // 在转换时，应该使用哪个loader
    }]
  }
}
```

**plugin（插件）**

`loader` 用于转换某些类型的模块，而`plugin`则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
	// ...
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

**mode（模式）**

通过选择`development`、`production`或`none`之中的一个，来设置`mode`参数，以启用`webpack`内置在相应环境下的优化。其默认值为`production`。

```js
module.exports = {
  mode: 'production'
}
```

##### 牛刀小试

---

> 下面步骤基本上是配置`webpack`环境的基础步骤，后续不会重复讲

1. 创建一个名为demo-01的文件夹，并初始化项目

```shell
yarn init
```

2. 安装webpack依赖

```shell
yarn add webpack webpack-cli -D
```

3. 安装`copy-webpack-plugin`插件，用于将指定目录或文件拷贝到输出文件中

```shell
yarn add copy-webpack-plugin -D
```

4. 安装`style-loader`、`css-loader`lodaer，用于转换`css`文件

```shell
yarn add style-loader css-loader -D
```

5. 安装`lodash`

```shell
yarn add lodash
```

6. 在项目根目录下创建一个`webpack`配置文件：`webpack.config.js`，并设置内容：

```js
const path = require('path')
// 将已存在的单个文件或整个目录复制到构建目录中
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: './src/index.js', // 入口文件配置
  output: { // 输出文件配置
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production', // 设置模式
  module: {
    rules: [{ // 对 css 文件进行转换
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new CopyWebpackPlugin({
      // 这里将 public 目录复制到输出目录
      patterns: ['public']
    })
  ]
}
```

7. 在项目根目录下创建`src/index.js`、`src/assets/css/index.css`、`public/index.html`

设置`src/index.js`：

```js
import throttle from 'lodash/throttle';
// 使用 css-loader 将css文件转换成模块
import './assets/css/index.css';

let count = 0;
const $box = document.querySelector('.box');
const $count = document.querySelector('#count');

const scrollFn = throttle(() => {
  $count.innerHTML = (++count);
}, 1000)

$box.addEventListener('scroll', scrollFn);
```



设置`src/assets/css/index.css`：

```css
.box {
  height: 249px;
  overflow: auto;
  background-color: #e6e6e6;
  border: 1px solid #eee;
}

.child {
  height: 19999px;
}
```



设置`dist/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>demo-01</title>
</head>
<body>
  <p>使用节流，执行了<span id="count">0</span>次方法</p>
  <div class="box">
    <div class="child"></div>
  </div>
  <script src="./main.js"></script>
</body>
</html>
```

8. 配置`package.json`的`scripts`，`webpack`命令会默认去找根目录下的`webpack.config.js`文件，也可以手动配置：

```json
{
  //...
  "scripts": {
    "build": "webpack --config webpack.config.js", // 手动配置
  }
}
```

9. 开始打包，运行：

```shell
yarn run build
```

输出：

![打包输出](./images/01.png)



##### 搭建一个Vue项目

----

> 搭建过程中，会进一步了解webpack用法，包括`配置`及`loader`、`plugin`

**1. 初始化项目**

初始化一个名为`vue-demo`的项目，步骤见上面的案例。

生成如下目录：

```tsx
|-- build
		|-- webpack.prod.js
|-- public
		|-- index.html
|-- src
		|-- main.js
|-- package.json
```

**2. 支持vue**



