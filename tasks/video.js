module.exports = function(){
	$.gulp.task('video',function (){
		return $.gulp.src('./src/video/**/*.*')
			.pipe($.gulp.dest('./dist/video'))
			.on('end',$.bs.reload);
	});
}