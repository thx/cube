module.exports = function(grunt) {

  var PORT = 5566

  var buildTo = grunt.option('buildTo') || '.package'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    buildTo: buildTo,

    cssmin: {
      minify: {
        expand: true,
        cwd: buildTo,
        src: ['*.css', '!*-min.css'],
        dest: buildTo,
        ext: '-min.css'
      }
    },
    concat: {
      options: {
        separater: '\n',
        process: function(src, fpath) {
          return src.replace(/@charset[^\n]+\n/mg, '')
        }
      },
      dist: {
        src: [
          'src/neat.css', 'src/layout.css', 'src/utils.css',
          'src/iconfont.css', 'src/button.css', 'src/table.css'
          // 展开需要合并的样式模块，确保模块的合并顺序
          // type.css 是相对独立的，不合并到 cube.css
        ],
        dest: '<%= buildTo %>/cube.css'
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

  grunt.file.defaultEncoding = 'utf8'

  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-concat')

  grunt.loadTasks('_tasks')

  grunt.registerTask('build', ['copySrc', 'concat', 'cssmin'])
  grunt.registerTask('default', ['build'])
}
