const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './dist/',
      index : 'index.html'
    }
  });
});

// sass を css に変換して autoprefixer する
gulp.task('sass', (done) => {
  gulp.src('./app/stylesheets/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({browsers: ['last 3 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8']}))
    .pipe(gulp.dest('./dist/stylesheets'))
    .pipe(browserSync.stream());
  done();
});

// pug を html に変換する
gulp.task('pug', (done) => {
  const option = {
    pretty: true
  };

  gulp.src(['./app/views/**/*.pug', '!' + './app/views/**/_*.pug'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(pug(option))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
  done();
});

gulp.task('gulpt', gulp.series('sass', 'pug', 'browser-sync'));

gulp.watch(['./app/stylesheets/**'], gulp.task('sass'));
gulp.watch(['./app/views/**'], gulp.task('pug'));
gulp.watch('./dist/javascripts/**/*.js').on('change', browserSync.reload);
