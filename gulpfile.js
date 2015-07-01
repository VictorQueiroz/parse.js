var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');

gulp.task('build', function () {
	gulp.src(['src/**.js'])
	.pipe(concat('parse.js'))
	.pipe(wrapper({
		header: "(function (window, undefined) {\n",
		footer: "\nwindow.Parser = Parser;\nwindow.Lexer = Lexer;\n}(window, undefined));\n"
	}))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});