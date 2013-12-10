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
          'src/neat.css', 'src/layout.css', 'src/utils.css',
          'src/iconfont.css', 'src/button.css'
          // 展开需要合并的样式模块，确保模块的合并顺序
          // type.css 是相对独立的，不合并到 cube.css
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

  grunt.file.defaultEncoding = 'utf8'

  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-concat')

  grunt.loadTasks('_tasks')

  grunt.registerTask('build', ['copySrc', 'concat', 'cssmin'])
  grunt.registerTask('daily', ['addGitlab', 'pushGitlab:daily'])
  grunt.registerTask('deploy', ['addGitlab', 'pushGitlab:prod'])
  grunt.registerTask('default', ['build'])
}
