# Cube

The brix style revised.

## 模块

- neat.css
- type.css
- iconfont.css
- utils.css

## neat.css

样式重置。

## type.css 为中文排版而生

国外现有的 <abbr title="Cascading Style Sheets">CSS</abbr> 解决方案（例如：
Bootstrap，Normalize，CSS Reset 等）都不会考虑针对中文排版做优化，type.css 就是为了
解决这个问题而生，以 neat.css 为基础，让普通使用者无需考虑排版细节，快速应用到博客、文章等
大面积中文排版的地方。

### 中文排版的难点：

1. 网页中可用简体中文字体较少，字体字号的选择尤为重要
2. 不同浏览器及操作系统的渲染差异
3. 特定 HTML 标签在中文排版中的用法，例如<u>专名号</u>`[&lt;u&gt;](#u)`

### Type.css 的优化

1. 默认字号设为14px，更加便于阅读
2. 字体根据不同的操作系统和浏览器做最佳适配：
   * Windows Vista 及其以上版本使用「微软雅黑」
   * OS X 10.6 及其以上版本使用「冬青黑体简体中文（Hiragino Sans GB）」
   * OS X 10.6 以下及 iOS 使用系统默认的「华文黑体」
   * Linux 使用「文泉驿微米黑（Wenquanyi Micro Hei）」
3. 针对特定的 HTML 标签做优化，见示例

## Iconfont.css

字体样式。

## Utils.css

工具样式。

## Snippets

示例样式：

```css
/** Retina 背景图片解决方案
 * @author:
 * @version:
 */
.retina {
    background-image: -webkit-image-set(url() 1x, url() 2x);
    /* Retina Safari 6+,Chrome 21+ */
}

@media only screen and (-o-min-device-pixel-ratio: 2/1),
/* Opera */
 only screen and (min--moz-device-pixel-ratio: 2),
/* Firefox 16 之前 */
 only screen and (-webkit-min-device-pixel-ratio: 2),
/* WebKit */
 only screen and (min-resolution: 192dpi),
/* 不支持dppx的浏览器 */
 only screen and (min-resolution: 2dppx)
/* 标准 */
 {
    .retina {
        background-image:url();
        /* Retina */
        background-size: 20px 50px;
    }
}
```