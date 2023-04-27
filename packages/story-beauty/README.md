# story-beauty

这是一武断的eslint+perttier方案

# use

第一步：

```sh
npm i story-beauty -D
yarn add story-beauty -D
```

第二步：

in `.eslintrc.js`

```js
const beauty = require("story-beauty");

module.exports = {
  ...beauty.eslint,
  rules:{
    // 你自己的自定义配置
  }
}
```

in `.prettierrc.js`

```js
const beauty = require("story-beauty");

module.exports = {
  ...beauty.prettier
}
```





