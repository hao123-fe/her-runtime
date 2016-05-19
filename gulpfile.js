var gulp = require('gulp');
var del = require('del');
var inline = require('gulp-inline-js');

var path = {
  libjs: {
    src: 'src/javascript/main.js',
    release: 'dist/javascript'
  },
  libplugin: {
    src: 'src/plugin/**/*',
    release: 'dist/plugin'
  },
  jshelper: {
    src: 'src/js_helper/**/*',
    release: 'dist/js_helper'
  }
};

//compile libjs
gulp.task('libjs:compile', function () {
  return gulp.src(path.libjs.src)
    .pipe(inline())
    .pipe(gulp.dest(path.libjs.release));
});

//copy runtime
gulp.task('libplugin:copy', function () {
  gulp.src(path.libplugin.src)
    .pipe(gulp.dest(path.libplugin.release));
});

//copy jshelper
gulp.task('js_helper:copy', function () {
  return gulp.src(path.jshelper.src)
    .pipe(gulp.dest(path.jshelper.release));
});

gulp.task('clean', del.bind(null, 'dist/**'));
gulp.task('compile', ['libjs:compile', 'libplugin:copy', 'js_helper:copy']);

gulp.task('default', ['clean'], function(){
  gulp.start('compile');
});