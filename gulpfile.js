const gulp = require('gulp');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
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
  .src(['src/public/**/*', '!src/public/**/*.html'])
  .pipe(gulp.dest('build/public'))
);

gulp.task('build-public-html', () => gulp
  .src('src/public/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build/public'))
);

gulp.task('default', ['build-server-js', 'build-public', 'build-public-html']);
