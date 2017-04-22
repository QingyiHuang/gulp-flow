var gulp = require('gulp')
	uglify = require('gulp-uglify')//js压缩
	rename = require('gulp-rename')//更名
	concat = require('gulp-concat')//合并
	imagemin = require('gulp-imagemin')//图片压缩
	pngquant = require('imagemin-pngquant')
	livereload = require('gulp-livereload')//自动刷新
	cssmin = require('gulp-minify-css')//css压缩
	htmlmin = require('gulp-minify-html');//html压缩

/*配置任务*/

//css压缩
gulp.task('cssmin',function(){
	gulp.src('./css/*css')
	.pipe(cssmin())
	.pipe(gulp.dest('./src'))
})

//js  压缩
gulp.task('uglify',function(){
	gulp.src('./js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./src'))
})

//html 压缩
gulp.task('htmlmin',function(){
	gulp.src('./*.html')
	.pipe(htmlmin())
	.pipe(gulp.dest('./src'))
})

//图片压缩
gulp.task('imagemin',function(){
	return gulp.src('./img/*')
		.pipe(imagemin({
			progressive:true,
			use:[pngquant()]//压缩png
		}))
		.pipe(gulp.dest('./src'));
})

//合并文件
gulp.task('concat',function(){
	gulp.src('./src/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./concat'));
	gulp.src('./src/*.css')
	.pipe(concat('all.css'))
	.pipe(gulp.dest('./concat'));
})

//自动刷新这个项目未曾使用less 所以就不忙做了
/*gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen(); //要在这里调用listen()方法
  gulp.watch('less/*.less', ['less']);
});*/

//执行任务
gulp.task('default', ['cssmin','uglify','htmlmin','imagemin','concat']);