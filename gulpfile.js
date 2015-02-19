var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass				= require('gulp-sass');
var useref      = require('gulp-useref');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('reload', function() {
   reload();
});

gulp.task('styles', function() {
	return gulp.src('src/**/*.scss')
		.pipe(sass({style: 'expanded', includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']}))
		.pipe(gulp.dest('src/'));
});

// Default task to be run with `gulp`
gulp.task('serve', ['styles', 'browser-sync'], function () {
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['reload']);
  gulp.watch(['src/**/*.scss'], ['styles', 'reload']);
});

gulp.task('build', ['styles'], function() {
  var assets = useref.assets();

  return gulp.src('src/index.html')
    .pipe(assets)
    // .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});