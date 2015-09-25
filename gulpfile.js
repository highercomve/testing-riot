var gulp = require('gulp'),
    browserify = require('browserify'),
    riotify = require('riotify'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    clean = require('gulp-clean'),
    serve = require('gulp-serve');

paths = {
  client: 'client/**/*',
  build: 'build',
  source: ['./build/js/todo-app.js', './build/js/todo-stores.js'],
  browserifyPath: ['./client/js/todo-app.js']
}

gulp.task('serve', ['build'], serve({
  root: ['build'],
  port: 9000,
}));

gulp.task('cleanBuild', function() {
  return del(['build'])
})

gulp.task('copy',function() {
  return gulp.src(paths.client)
        .pipe(gulp.dest(paths.build))
})

gulp.task('copyBuild', ['copy'], function() {
  return gulp.src(paths.source)
        .pipe(clean())
})

gulp.task('build', ['copyBuild'],function() {
  return browserify(paths.browserifyPath, {
          transform: ['riotify', 'babelify']
      })
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build/js/'));
});
