// Initialize modules
const gulp = require('gulp')
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');
const concat =  require('gulp-concat');
const minifyJS = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
})

gulp.task('css', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass())
  .pipe(minifyCSS())
  .pipe(autoprefixer())
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
})

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
  .pipe(babel({presets: ['@babel/env']}))
  .pipe(concat('app.min.js'))
  .pipe(minifyJS())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
})

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
})

gulp.task('delete', () => del(['dist/css', 'dist/js', 'dist/**/*.html']));

gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('src/scss/**/*.scss', ['css'])
  gulp.watch('src/js/**/*.js', ['js'])
})

gulp.task('default', () => {
  runSequence(
    'delete',
    'html',
    'css',
    'js',
    'browser-sync',
    'watch'
  );
});