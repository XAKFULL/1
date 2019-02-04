module.exports = function(){
	$.gulp.task('parts',function (){
		return $.gulp.src('./src/parts/**/*.*')
			.pipe($.gulp.dest('./dist/parts'))
			.on('end',$.bs.reload);
	});
}