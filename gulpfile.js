'use strict';

global.$ = {
	gulp				: require ('gulp'),
	gp				: require('gulp-load-plugins')(),
	bs				: require('browser-sync').create(),
	del 				: require('del'),
	concat 		: require ('gulp-concat'),
	uglify 		: require('gulp-uglify'),
	autoprefixer 	: require('gulp-autoprefixer'),
	cleanCSS 		: require('gulp-clean-css'),
	sass  		: require ('gulp-sass'), 


	path:{
		tasks: require('./tasks/config/tasks.js')
	}
};


$.path.tasks.forEach(function (taskPath) {
	require(taskPath)();
})	

$.gulp.task('default', $.gulp.series(
	'clean',
	$.gulp.parallel('sass', 'scripts', 'html', 'pics', 'parts', 'video', 'fonts'),
	$.gulp.parallel('watch', 'serve')
));