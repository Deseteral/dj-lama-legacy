const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

gulp.task('build-public', () => gulp
  .src(['src/public/**/*', '!src/public/**/*.html'])
  .pipe(gulp.dest('build/public'))
);

gulp.task('build-public-html', () => gulp
  .src('src/public/**/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
    minifyCSS: true
  }))
  .pipe(gulp.dest('build/public'))
);

gulp.task('default', ['build-public', 'build-public-html']);
