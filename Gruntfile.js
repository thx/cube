module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'build/cube.css': ['*.css', 'type.css/type.css']
        }
      },
      minify: {
        expand: true,
        cwd: 'build',
        src: ['*.css', '!*-min.css'],
        dest: 'build',
        ext: '-min.css'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-cssmin')

  // 将源文件复制到 build 目录下，这么做似乎听土鳖的，高大上一些的做法：
  //
  // 1. 源文件该用 SCSS 或者 Stylus 编写，有个正式的编译步骤
  // 2. CDN 上不提供源文件，有压缩版就够了
  //
  // 暂时先这样吧。
  grunt.registerTask('copy2build', function() {
    grunt.file.expand('*.css').forEach(function(module) {
      grunt.file.copy(module, 'build/' + module)
      grunt.log.writeln('Copyed ' + module + ' to build directory.')
    })
  })
  grunt.registerTask('default', ['copy2build', 'cssmin'])
}