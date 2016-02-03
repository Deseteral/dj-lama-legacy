const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build-static'], () => {
  return gulp
    .src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('build-static', () => {
  return gulp
    .src('src/static/**/*')
    .pipe(gulp.dest('dist/static'));
});
