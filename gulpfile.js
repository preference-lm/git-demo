/**
 * gulp的主文件，用于注册任务的
 */
"use strict";

/*此处代码都是由node执行*/
/*载入gulp模块*/
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/*注册一个任务*/
// 1.LESS编译 压缩 合并没必要
gulp.task('style',function () {
	gulp.src(['src/style/*.less','!src/style/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dis/styles'))
		.pipe(browserSync.reload({stream: true}));
})
// 2.JS合并 压缩 混淆
gulp.task('script',function () {
	gulp.src('src/script/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dis/scripts'))
		.pipe(browserSync.reload({stream: true}));
});
// 3.图片复制
gulp.task('image',function () {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dis/images'))
		.pipe(browserSync.reload({stream: true}));
});
// 4.html
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function () {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
		.pipe(gulp.dest('dis'))
		.pipe(browserSync.reload({stream: true}));
});

var browserSync = require('browser-sync');

gulp.task('serve',function () {
	browserSync.init({
		server: {
			baseDir: "dis/"
		}
	})
	gulp.watch('src/style/*.less',['style']);
	gulp.watch('src/script/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
})