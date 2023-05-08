# story-beauty

这是一武断的 eslint+perttier 解决方案

# use

第一步：

```sh
npm i story-beauty -D
yarn add story-beauty -D
```

第二步：

```sh
npx beauty // 生成.eslintrc.js 和 .prettierrc.js两个文件
```

第三步：

in `.eslintrc.js`

```js
const beauty = require('story-beauty')

module.exports = {
  ...beauty.eslint,
  rules: {
    // 你自己的自定义配置
  },
}
```

in `.prettierrc.js`

```js
const beauty = require('story-beauty')

module.exports = {
  ...beauty.prettier,
}
```
