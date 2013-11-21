# 如何贡献代码

## 开发环境

Cube 项目采用 Github Pages，任何在 gh-pages 分支中的改动都能在
<http://thx.github.io/cube> 看到。本地开发时，则需要安装一个叫做 github-pages 的
Ruby Gem。

### 安装 github-pages

我们依赖 Ruby 与 github-pages，后者是个 Ruby Gem。Windows 用户，不妨
[参考这篇文章](http://stormtea123.github.io/jekyll-window7.av/)，其中还有 Windows
下遇到乱码的解决办法。

Mac 自带 Ruby，直接 `sudo gem install github-pages` 即可。如果你知道 RVM、rbenv 等，

应该不需要我该诉你怎么装 Ruby Gem 啦。

Github Pages 的秘密在于 jekyll，是个静态站点生成工具。

推荐到 [Jekyll 的官方网站](http://jekyllrb.com/) 学习用法，一般只需要用到
`jekyll serve --watch` 命令。还可以从该网站学习文本的组织方式，Liquid 模板的写法。

### jekyll 基础

jekyll 是个静态站点生成工具，执行 jekyll 命令时，将当前目录中的内容作为配置与数据，生成
相应的结果，并放入 _site 目录。通过 <http://thx.github.io/cube> 访问时看到的，正是
_site 目录中的内容。

使用如下命令启动本地服务：

    jekyll serve --watch

`--watch` 参数用来开启目录监测，当有文件改动时，自动重新生成 _site。

启动后，访问 <http://127.0.0.1:4000> 即可。

### 发布

发布至日常环境：

```bash
$ grunt daily
```

发布至线上：

```bash
$ grunt deploy
```

日常与线上环境的访问地址请看 <http://thx.github.io/cube/doc>。

## CSS 书写规范

参照：[CSS 创作指南](https://github.com/yisibl/css-creating)
