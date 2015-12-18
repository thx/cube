---
layout: post
title: Cube
---

## 缘起

Cube <i class="iconfont">&#444;</i> 取自电影
《[Cube](http://movie.douban.com/subject/1305903/)》。电影里的 Cube
是个构造错综复杂的立方体，我们取这个名字，则是希望此项目能回归立方体的本意，和电影的愿景，
即项目应简单，一横一竖，自成一体。

## 模块

{% include cubeModules.html %}

## 使用

{% include cubeUsage.html %}

### 下载

{% include cubeBuild.html %}

### 选择与折衷

需要注意的是 cube.css 中将包含：

- [neat.css]({{ site.baseurl }}/doc/neat)
- [layout.css]({{ site.baseurl }}/doc/layout)
- [button.css]({{ site.baseurl }}/doc/button)
- utils.css

但**不包含** [type.css]({{ site.baseurl }}/doc/type)。因此在需要版式设计的网站，例如
个人博客中，我们推荐一次加载 cube.css 与 type.css：

```html
<link rel="stylesheet" href="//g.alicdn.com/thx/cube/{{ site.version }}/??cube-min.css,type-min.css">
```

## Who's Using

<ul class="whos-using">
{% for user in site.data.users %}
  <li><a href="{{ user.homepage }}">{{ user.name }}</a></li>
{% endfor %}
</ul>

## 贡献代码

请阅读 <https://github.com/thx/cube/blob/gh-pages/CONTRIBUTING.md>。

## 榜样

- [Kraken](http://cferdinandi.github.io/kraken/index.html)
- [Kube](http://imperavi.com/kube/)
- [Bootstrap](http://getbootstrap.com/)
