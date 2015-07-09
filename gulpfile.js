var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    connect = require('gulp-connect'),
    autoprefix = new lessPluginAutoPrefix({
        browsers: [
            "ie >= 8",
            "ie_mob >= 10",
            "ff >= 26",
            "chrome >= 30",
            "safari >= 6",
            "opera >= 23",
            "ios >= 5",
            "android >= 2.3",
            "bb >= 10"
        ]
    });

/* 
 * 运行min-styles，使用concat和minifycss合并压缩css文件
 *
 * 运行less来把less文件编译成css文件
 * 另外还有plugins插件来添加浏览器兼容前缀
 */
var custom_less = ['./src/less/style.less'],
    lib_css = ['./src/lib/normalize.css'];

gulp.task('minCss', ['less'], function() {
    var css_task_list = ['./dist/css/*'];

    gulp.src(lib_css)
        .pipe(gulp.dest('./dist/css'));

    gulp.src(css_task_list)
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./publish/css/'))
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./publish/css/'));
});

gulp.task('less', function() {
    gulp.src(custom_less)
        .pipe(less({
            compress: false,
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./dist/css/'));
});

/* 
 * custom_javascript是个人写的，需要进行jshint的验证
 * lib_javascript是外部引入的稳定的类库
 * lib_javascript是外部引入的稳定的类库
 *
 * 运行concatScript命令来合并js文件
 * 并且使用rename和uglify来重命名和压缩文件 
 *
 * 运行jshint验证javascript代码的规范性，并且在报告里面显示出来
 */
var custom_javascript = ['./src/js/common-1.js', './src/js/common-2.js'],
    lib_javascript = ['./src/lib/zepto.min.js', './src/lib/jquery-2.1.4.min.js'],
    js_task_list = [
        ['./dist/js/jquery-2.1.4.min.js', './dist/js/common-1.js'],
        ['./dist/js/zepto.min.js', './dist/js/common-2.js']
    ];

gulp.task('concatScript', ['jshint'], function() {
    gulp.src(custom_javascript)
        .pipe(gulp.dest('./dist/js'));
    gulp.src(lib_javascript)
        .pipe(gulp.dest('./dist/js'));

    for (var i = 0; i < js_task_list.length; i++) {
        var cur_task = js_task_list[i],
            cur_file = 'all-' + i + '.js',
            cur_file_min = 'all-' + i + '.min.js';

        gulp.src(cur_task)
            .pipe(concat(cur_file))
            .pipe(gulp.dest('./publish/js/'))
            .pipe(rename(cur_file_min))
            .pipe(uglify())
            .pipe(gulp.dest('./publish/js/'));
    }

    gulp.src('./config.js')
        .pipe(rename('config.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('jshint', function() {
    gulp.src(custom_javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/* 
 * 发布版本的任务，使用命令gulp online
 */
var images_list = [
        ['/'],
        ['mianma/']
    ],
    js_list;

gulp.task('online', function() {
    for (var i = 0; i < images_list.length; i++) {
        var fromUrl = './publish/images/',
            toUrl = './production/publish/images/',
            cur_images_dir = images_list[i],
            cur_from = fromUrl + cur_images_dir + '*',
            cur_to = toUrl + cur_images_dir;

        gulp.src(cur_from)
            .pipe(gulp.dest(cur_to));
    }

    for (var i = 0; i < js_task_list.length; i++) {
        var cur_js = './publish/js/all-' + i + '.min.js';
        gulp.src(cur_js)
            .pipe(gulp.dest('./production/publish/js'));
    }

    gulp.src(['./publish/css/all.min.css'])
        .pipe(gulp.dest('./production/publish/css'));

    gulp.src(['./*.html'])
        .pipe(gulp.dest('./production/'));

    gulp.src(['./config.min.js'])
        .pipe(gulp.dest('./production/'));
});

/*
 * 运行刷新任务
 *
 * 开启本地服务器，livereload设置为true可以保存的时候进行更新
 */
gulp.task('reload', function() {
    gulp.src('./*')
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

/*
 * 默认任务
 */
gulp.task('default', function() {

    // 一进来就运行connect jshint concatScript less minCss命令
    gulp.run('connect', 'jshint', 'concatScript', 'less', 'minCss');

    // 监控js文件，有变化的时候运行jshint concatScript reload命令
    gulp.watch('./src/js/*', function() {
        gulp.run('jshint', 'concatScript', 'reload');
    });

    // 监控less文件，有变化的时候运行less minCss reload命令
    gulp.watch('./src/less/*', function() {
        gulp.run('less', 'minCss', 'reload');
    });

    // 监控index和images文件，在变化的时候运行reload
    gulp.watch(['./*.html'], function() {
        gulp.run('reload');
    });
})
