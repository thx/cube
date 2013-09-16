<h2>Type.css 为中文排版而生</h2>
<p>国外现有的 <abbr title="Cascading Style Sheets">CSS</abbr> 解决方案（例如：Bootstrap，Normalize，CSS Reset 等）都不会考虑针对中文排版做优化，Type.css 就是为了解决这个问题而生，以 neat.css 为基础，让普通使用者无需考虑排版细节，快速应用到博客、文章等大面积中文排版的地方。</p>
<h2>中文排版有如下几个难点：</h2>
<ol>
    <li>网页中可用简体中文字体较少，字体字号的选择尤为重要</li>
    <li>不同浏览器及操作系统的渲染差异</li>
    <li>特定 HTML 标签在中文排版中的用法，例如<u>专名号</u><code><a href="#u">&lt;u&gt;</a></code></li>
</ol>
<h2>Type.css 做了如下优化</h2>
<ol>
    <li>
       默认字号设为14px，更加便于阅读
    </li>
    <li>
        字体根据不同的操作系统和浏览器做最佳适配：
        <ul>
            <li>Windows Vista 及其以上版本使用「微软雅黑」</li>
            <li>OS X 10.6 及其以上版本使用「冬青黑体简体中文（Hiragino Sans GB）」</li>
            <li>OS X 10.6 以下及 iOS 使用系统默认的「华文黑体」</li>
            <li>Linux 使用「文泉驿微米黑（Wenquanyi Micro Hei）」</li>
        </ul>
    </li>
    <li>针对特定的 HTML 标签做优化，见示例</li>
</ol>
