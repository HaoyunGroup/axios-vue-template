# vue-template

本项目为我自己用的一个 vue 项目基础模板,模板封装了 axios 的请求，
以及移动端的 rem 适配，UI 框架采用是是 vant。

## 项目额外需要安装插件有如下内容

```javascript
npm install --save axios qs vant
npm install --save-dev amfe-flexible // 淘宝的自适应
npm install --save-dev babel-plugin-import // 按需引入
npm install --save-dev postcss-pxtorem// css 转 rem
```

## 配置 vant 按需引入

在 babel.config.js 中配置

## 新建 vue.config.js 配置 vant 的自适应

## main.js 引入一些东西

```javascript
import "amfe-flexible";
import "vant/lib/index.css";
```

```javascript
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
