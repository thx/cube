var gulp     = require('gulp')
var concat   = require('gulp-concat')
var rename   = require('gulp-rename')
var cssmin   = require('gulp-minify-css')
var sass     = require('gulp-sass')
var replace  = require('gulp-replace')


gulp.task('sass', function() {
  gulp.src('scss/iconfont.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src'))
})

gulp.task('http', ['sass'], function() {
  gulp.src('src/iconfont.css')
    .pipe(replace(/(https:)?\/\/assets.alicdn.com/g, 'http://t.tbcdn.cn'))
    .pipe(gulp.dest('src'))
})

gulp.task('https', ['sass'], function() {
  gulp.src('src/iconfont.css')
    .pipe(replace(/http:\/\/t.tbcdn.cn/g, '//assets.alicdn.com'))
    .pipe(gulp.dest('src'))
})

//打包 neat.css
gulp.task('neat', function() {
  gulp.src('src/neat.css')
    .pipe(concat('neat.css'))
    .pipe(gulp.dest('build'))
    .pipe(cssmin())
    .pipe(rename('neat-min.css'))
    .pipe(gulp.dest('build'))
})

//打包 type.css
gulp.task('type', function() {
  gulp.src('src/type.css')
    .pipe(concat('type.css'))
    .pipe(gulp.dest('build'))
    .pipe(cssmin())
    .pipe(rename('type-min.css'))
    .pipe(gulp.dest('build'))
})

//打包 cube http 版本
gulp.task('cube-http', ['http'], function() {
  // 展开需要合并的样式模块，确保模块的合并顺序
  // type.css 是相对独立的，不合并到 cube.css
  var src = [
    'src/neat.css', 'src/layout.css', 'src/utils.css',
    'src/iconfont.css', 'src/button.css', 'src/table.css'
  ]
  gulp.src(src)
    .pipe(concat('cube.css'))
    .pipe(replace(/@charset[^\n]+\n/mgi, ''))
    .pipe(gulp.dest('build'))
    .pipe(cssmin())
    .pipe(rename('cube-min.css'))
    .pipe(gulp.dest('build'))
})

//打包 cube https 版本
gulp.task('cube-https', ['https'], function() {
  // 展开需要合并的样式模块，确保模块的合并顺序
  // type.css 是相对独立的，不合并到 cube.css
  var src = [
    'src/neat.css', 'src/layout.css', 'src/utils.css',
    'src/iconfont.css', 'src/button.css', 'src/table.css'
  ]
  gulp.src(src)
    .pipe(concat('cube-https.css'))
    .pipe(replace(/@charset[^\n]+\n/mgi, ''))
    .pipe(gulp.dest('build'))
    .pipe(cssmin())
    .pipe(rename('cube-https-min.css'))
    .pipe(gulp.dest('build'))
})


gulp.task('default', ['cube-http', 'neat', 'type'])
gulp.watch(['src/*.css', 'scss/*.scss'], ['default'])
