module.exports = function(grunt) {
  var path = require('path')


  var buildTo = grunt.config('buildTo')

  // 将源文件复制到 build 目录下，这么做似乎挺土鳖，高大上一些的做法：
  //
  // 1. 源文件该用 SCSS 或者 Stylus 编写，有个正式的编译步骤
  // 2. CDN 上不提供源文件，有压缩版就够了
  //
  // 暂时先这样吧。
  grunt.registerTask('copySrc', 'copy files from src to build', function() {
    var dest = path.resolve(process.cwd(), buildTo)

    grunt.file.expand('src/{neat,type}.css').forEach(function(module) {
      grunt.file.copy(module, path.join(dest, module.replace('src', '')))
      grunt.log.writeln('Copyed ' + module + ' to' + buildTo)
    })
  })
}