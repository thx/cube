# Changelog

# V1.3.2

* 新增：stylelint 检测 CSS 语法。
* 新增：NPM 包，使用 `npm install --save cube.css` 即可。
* 删除：neat 中的  `dialog` 元素相关的默认样式。
* 修改：neat 中 `a:active { background-color: transparent; }` 重置权重过高, 改为`a { background-color: transparent; }`。
* 修改：为了减少影响，所有重置属性都改为非简写。比如 `border: none` 改为 `border-style: none`。

# V1.3.1

* 更新： postcss-filter-gradient 到 0.2.0[#2](https://github.com/yuezk/postcss-filter-gradient/issues/2)，IE filter 变为小写。

# V1.3.0

* 全面转移到 PostCSS + Sass 平台。
* 新增：Autoprefixer 自动生成前缀。
* 新增：Source Maps。
* 修改：缩进由 4 个空格统一修改为 2个。
* 修复：`text-autospace` 修改为 CSS 规范标准的 `text-spacing`。
* 删除：全量引用的 iconfont 组件，推荐使用 iconfont.cn。


# V1.2.2

* 新增：CDN 引用地址增加 https 版本。
* 修改：打包方式由 Grunt 改为 Gulp。

# V1.2.1

* 更新：文档。
* 更新：neat 更新到 v1.1.0，同步 normalize 3.0 部分更新。
* 修复：pre 标签默认有滚动条，为移动端增加平滑滚动。

# V1.2.0

* 新增：iconfont SCSS 版本
* 新增：type.css 标题和 `ol` 自动编号功能，生成类似`1`, `1.1`, `1.1.1` 这样的编号。
* 新增：type.css `p` 标签内链接左右增加一个英文空格。
* 修改：ul 默认列表项改成方块。
* 修复：`.justify`` 父元素设置 `line-height`` 导致布局错乱的 [bug #11](https://github.com/thx/cube/issues/11)
* 修复：按钮样式。
