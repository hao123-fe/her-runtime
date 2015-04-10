var gulp = require('gulp');
var inline = require('gulp-inline-js');
var dest = 'dist';

var path = {
  libjs: {
    src: 'src/javascript/**/*',
    release: 'dist/javascript'
  },
  libplugin: {
    src: 'src/plugins/**/*',
    release: 'dist/plugins'
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

gulp.task('default', ['libjs:compile', 'libplugin:copy']);
