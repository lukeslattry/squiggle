var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var cssbeautify = require('gulp-cssbeautify');
var shell = require('gulp-shell');

gulp.task('scss', function() {
	gulp.src('scss/**/*.scss')
		.pipe(changed('css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(cssbeautify())
		.pipe(gulp.dest('public/css'));
});

gulp.task('start', shell.task([
  'node server.js'
]));

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['scss'])
});

gulp.task('default', ['scss', 'start']);