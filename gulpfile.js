const gulp = require('gulp');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['build-server', 'build-public', 'build-public-html']);

gulp.task('build-server', ['build-misc'], () => gulp
  .src(['src/**/*.js', '!src/client.js', '!src/components/**/*'])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015-node6']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('build/src'))
);

gulp.task('build-misc', () => gulp
  .src('package.json')
  .pipe(gulp.dest('build'))
);

gulp.task('build-public', () => gulp
  .src(['src/public/**/*', '!src/public/**/*.html'])
  .pipe(gulp.dest('build/src/public'))
);

gulp.task('build-public-html', () => gulp
  .src('src/public/**/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
    minifyCSS: true
  }))
  .pipe(gulp.dest('build/src/public'))
);

gulp.task('build-server-tests', ['build-server'], () => gulp
  .src(['tests/**/*.test.js'])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015-node6']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('build/tests'))
);
