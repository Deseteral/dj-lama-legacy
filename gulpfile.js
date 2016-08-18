const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build-js', () =>
  gulp
    .src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015-node6']
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('build/src'))
);

gulp.task('build-tests', ['build-js'], () =>
  gulp
    .src('tests/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015-node6']
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('build/tests'))
);

gulp.task('default', ['build-js']);
