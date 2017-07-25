//依赖
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var reload = browserSync.reload;

// 路径，家长端和老师端切换
var path = {
    root: "./",
// code:"./parent.com/parent/"//家长端
 code: "./weixiaoyuan30/view/" 
};
var dev = {
    html: path.code + "html/**/*.html",
    sass: path.code + "sass/*.scss",
    css: path.code + "css/",
    js: path.code + "js/*.js",
};

// 静态服务器
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: path.root
        },
        notify: false
    });
});

// scss编译css，浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src(dev.sass)
        .pipe(sass())
        .pipe(autoprefixer({
            "browsers": [
                "last 10 versions",
                "last 12 Chrome versions",
                "Firefox > 20",
                "ie 6-8"
            ],
            cascade: true
        }))
        .pipe(changed(dev.css))
        .pipe(gulp.dest(dev.css))
        .pipe(reload({ stream: true }));
});

//监视更新
gulp.task('watch', function() {
    gulp.watch(dev.html).on('change', reload); //reload({stream: true})不自动更新
    gulp.watch(dev.sass, ['sass']);
    gulp.watch(dev.js).on('change', reload);
})

//默认命令
gulp.task('default', ['serve', 'watch', 'sass']);
