# Cube

The brix style revised. <http://thx.github.io/cube>

## Grunt Task to Deploy

发布到日常环境：

```bash
$ grunt daily
```

发布到线上：

```bash
$ grunt deploy
```

默认会上升一个补丁版本，即，假如当前稳定版本为 1.1.0，则发布后将版本升至 1.1.1。如果需要
变更主版本号或者小版本号，手动修改 package.json 中的 version 值即可。