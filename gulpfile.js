var gulp           = require('gulp')
var del            = require('del')
var size           = require('gulp-size')
var sass           = require('gulp-sass')
var nano           = require('gulp-cssnano')
var concat         = require('gulp-concat')
var rename         = require('gulp-rename')
var postcss        = require('gulp-postcss')
var runSequence    = require('run-sequence')
var autoprefixer   = require('autoprefixer')
var sourcemaps     = require('gulp-sourcemaps')
var filterGradient = require('postcss-filter-gradient')


var browserOptions = {
  browsers: [
    'last 3 versions',
    'ie >= 6',
    'firefox >= 30',
    'chrome >= 34',
    'safari >= 6',
    'opera >= 12.1',
    'ios >= 6',
    'android >= 2.3',
    'and_uc 9.9',
  ]
}

// Sass(libsass)
// sourcemaps: http://www.sitepoint.com/using-source-maps-debug-sass-chrome/
gulp.task('css', function() {
  return gulp.src(['src/scss/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
      filterGradient(),
      autoprefixer(browserOptions)
    ]))
    .pipe(sourcemaps.write('.', {
      //推荐开启(默认)，如果关闭，则需要开启 sourceRoot 中的 SCSS 文件所在的相对路径
      includeContent: true,
      // sourceRoot: '../scss/'
    }))
    .pipe(gulp.dest('src/css'))
})

// CSS minify
gulp.task('minify-css', function() {
  return gulp.src(['src/css/**/*.css'])
    .pipe(gulp.dest('build'))
    .pipe(nano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build'))
    .pipe(size({
      title: 'CSS 压缩完成',
      showFiles: true
    }))
})

// Clean file
gulp.task('clean', function() {
  del.sync(['build/*'])
})


// watch
gulp.task('watch', function() {
  gulp.watch(['src/scss/**/*.scss'], ['css'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type)
    })
})

gulp.task('default', function(callback) {
  runSequence(
    'css',
    'watch',
    callback)
})

// build file
gulp.task('build', function(callback) {
  runSequence(
    'css',
    'clean',
    'minify-css',
    callback)
})
