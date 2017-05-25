
var gulp=require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify =require("gulp-uglify");
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var browserSync=require("browser-sync").create();


gulp.task("sass",function(){
	return gulp.src("scss/*.scss")
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(gulp.dest("./css"))
})

//图片压缩有问题，不知道为什么不可以使用，只可以复制图片到指定位置去
gulp.task("img",function(){
	 gulp.src("img/*")
			//.pipe(imagemin())
			.pipe(gulp.dest("./images"))
})


//静态服务器，自动刷新,base on url :http://www.browsersync.cn/docs/gulp/


//html document uglify ,base on url :http://blog.csdn.net/zhongguohaoshaonian/article/details/53207254
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('reindex.html')
        .pipe(htmlmin(options))
				.pipe(rename("index.html"))
        .pipe(gulp.dest('./'));
});

gulp.task("javascript",["sass"],function(){
		return gulp.src("es6/*.js")
		 	.pipe(concat('main.js'))
			.pipe(uglify())
			.pipe(gulp.dest("./javascript"))
})

//静态服务器，自动刷新,base on url :http://www.browsersync.cn/docs/gulp/
gulp.task("default",["javascript","img","htmlmin"],function(){
	gulp.start('javascript','sass','img','htmlmin');
	browserSync.init({
			port : 8888,
			server : {
					baseDir:["./"],
			}
	});
	gulp.watch("scss/*.scss",["sass"]).on('change', browserSync.reload)
	gulp.watch("es6/*.js",["javascript"]).on('change', browserSync.reload)
	gulp.watch("img/*",["img"]).on('change', browserSync.reload)
	gulp.watch("*.html",["htmlmin"]).on('change', browserSync.reload)
	
})
