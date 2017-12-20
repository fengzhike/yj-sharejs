var	gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('server',()=>{
	connect.server({
		port:3000
	})
});

gulp.task('default',['server'],()=>{
	console.log('servered at 3000')
})