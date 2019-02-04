module.exports = function(){
	$.gulp.task('pics',function (){
		return $.gulp.src('./src/img/**/*.*')
			.pipe($.gulp.dest('./dist/img'))
			.on('end',$.bs.reload);
	});
}