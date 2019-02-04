module.exports = function(){
	$.gulp.task('watch',function (){
		$.gulp.watch('./src/js/*.js', $.gulp.series('scripts'));
		$.gulp.watch('./src/sass/**/*.sass', $.gulp.series('sass'));
		$.gulp.watch('./src/index.html', $.gulp.series('html'));
		$.gulp.watch('./src/img/**/*.*', $.gulp.series('pics'));
		$.gulp.watch('./src/video/*', $.gulp.series('video'));
		$.gulp.watch('./src/parts/**/*.*', $.gulp.series('parts'));
		$.gulp.watch('./src/fonts/**/*.*', $.gulp.series('fonts'));
	});
}







