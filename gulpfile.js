const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build-server-js', () => gulp
  .src(['src/**/*.js', '!src/client.js', '!src/components/**/*'])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015-node6']
  }))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('build'))
);

gulp.task('build-public', () => gulp
  .src('src/public/**/*')
  .pipe(gulp.dest('build/public'))
);

gulp.task('default', ['build-server-js', 'build-public']);
