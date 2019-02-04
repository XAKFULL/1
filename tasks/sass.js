module.exports = function(){
	$.gulp.task('sass',function (){
		return $.gulp.src('./src/sass/**/*.sass')
			.pipe($.sass())
			.pipe($.autoprefixer({
		            browsers: ['last 2 versions'],
		            cascade: false
		     }))
		     .pipe($.concat('main.min.css'))
		     .pipe($.cleanCSS({level: 2}))
			.pipe($.gulp.dest('./dist/'))	
			.on('end',$.bs.reload);
	});
}
