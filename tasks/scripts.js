module.exports = function(){
	$.gulp.task('scripts',function (){
		return $.gulp.src('./src/js/*.js')
			.pipe($.concat('scripts.js'))
			.pipe($.uglify({toplevel: true}))
			.pipe($.gulp.dest('./dist/js'))	
			.on('end',$.bs.reload);
	});
}



