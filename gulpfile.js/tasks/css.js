var config       = require('../config')
if(!config.tasks.css) return

var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')
var cssnano      = require('gulp-cssnano')

var postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
lost = require('lost');

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

var cssTask = function () {
  return gulp.src(paths.src)
  .pipe(gulpif(!global.production, sourcemaps.init()))
  .pipe(sass(config.tasks.css.sass))
  .pipe(postcss([
    autoprefixer({ browsers: ['last 2 versions'] }),
    lost()
  ]))
  .on('error', handleErrors)
  .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
  .pipe(gulpif(!global.production, sourcemaps.write()))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}

gulp.task('css', cssTask)
module.exports = cssTask
