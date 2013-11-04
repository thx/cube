module.exports = function(grunt) {

  var PORT = 5566

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      minify: {
        expand: true,
        cwd: 'build',
        src: ['*.css', '!*-min.css'],
        dest: 'build',
        ext: '-min.css'
      }
    },
    concat: {
      options: {
        separater: '\n'
      },
      dist: {
        src: [
          'src/neat.css', 'src/type.css', 'src/layout.css', 'src/iconfont.css',
          'src/utils.css'
          // 展开需要合并的样式模块，确保模块的合并顺序
        ],
        dest: 'build/cube.css'
      }
    },
    connect: {
      server: {
        options: {
          port: PORT,
          base: '.',
          hostname: '*'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-connect')

  // 将源文件复制到 build 目录下，这么做似乎听土鳖的，高大上一些的做法：
  //
  // 1. 源文件该用 SCSS 或者 Stylus 编写，有个正式的编译步骤
  // 2. CDN 上不提供源文件，有压缩版就够了
  //
  // 暂时先这样吧。
  grunt.registerTask('copy2build', function() {
    grunt.file.expand('src/*.css').forEach(function(module) {
      grunt.file.copy(module, module.replace('src', 'build'))
      grunt.log.writeln('Copyed ' + module + ' to build directory.')
    })
  })
  grunt.registerTask('default', ['copy2build', 'concat', 'cssmin'])
  grunt.registerTask('serve', ['connect:server:keepalive'])
}