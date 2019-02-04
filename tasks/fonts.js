module.exports = function(){
	$.gulp.task('fonts',function (){
		return $.gulp.src('./src/fonts/**/*.*')
			.pipe($.gulp.dest('./dist/fonts'))
			.on('end',$.bs.reload);
	});
}