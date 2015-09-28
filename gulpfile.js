var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence').use(gulp),
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

console.log('           * --- Happy Coding --- *');
/* 
 * config是基础的配置对象
 */

var gulpTemplateConfig = require('./gulp-template-config.json');

var config = {
    // 由用户配置，可输入多个less文件名
    lessList: [],
    // 由用户配置，可输入多个外来引入的css文件名，一般项目只引入normalize.css文件
    cssLibList: [],
    // 由用户配置，这是用户自己编写的js文件，需要通过jshint验证js规范
    scriptList: [],
    // 由用户配置，代表js文件的各种依赖关系
    jsTaskList: [],
    // 由用户配置，代表根目录下的js文件，压缩以后扔放在根目录，不需要添加js后缀
    rootJsList: [],

    // 由程序生成包含所有位于config.cssPath路径下的css文件
    allCssList: [],
    // 下面是路径的设置
    lessPath: './src/less/', // 代表less文件的基目录
    cssPath: './src/css/', // 代表所有css文件的基目录
    publishCssPath: './publish/css/', //代表发布的css的目录
    jsPath: './src/js/', // 代表所有js文件的基目录
    publishJsPath: './publish/js/', // 代表发布的js的目录
    imgPath: './publish/images/', //  代表发布的图片的目录

    // 0 代表不执行publishScript任务
    // 1 代表执行config.jsPath下面的publishScript任务
    // 2 代表执行config.rootJsList下面的publishScript任务
    publishScriptIndex: 0,
    jsTaskListIndex: -1
};

for (var p in gulpTemplateConfig) {
    if (gulpTemplateConfig.hasOwnProperty(p)) {
        config[p] = gulpTemplateConfig[p];
    }
}

var watchRootJsList = [];
for (var i = 0; i < config.rootJsList.length; i++) {
    watchRootJsList.push(config.rootJsList[i] + '.js');
}

// 处理css文件相关的数组
for (var i = 0; i < config.cssLibList.length; i++) {
    config.cssLibList[i] = config.cssPath + config.cssLibList[i];
    config.allCssList.push(config.cssLibList[i]);
}
for (var i = 0; i < config.lessList.length; i++) {
    config.allCssList.push(config.cssPath + config.lessList[i].replace(/\.le/, '.c'));
    config.lessList[i] = config.lessPath + config.lessList[i];
}

// 处理js文件相关的数组
for (var i = 0; i < config.scriptList.length; i++) {
    config.scriptList[i] = config.jsPath + config.scriptList[i];
}
for (var i = 0; i < config.jsTaskList.length; i++) {
    for (var j = 0; j < config.jsTaskList[i].length; j++) {
        config.jsTaskList[i][j] = config.jsPath + config.jsTaskList[i][j];
    }
}

/* 
 * less任务 把config.lessPath路径下的less文件编译成css文件
 *
 * publishCss任务 把config.cssPath路径下的css文件合并在一起
 */

gulp.task('less', function() {
    gulp.src(config.lessList)
        .pipe(less({
            compress: false,
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(config.cssPath));
});

gulp.task('publishCss', function() {
    gulp.src(config.allCssList)
        .pipe(concat('all.css'))
        .pipe(gulp.dest(config.publishCssPath))
        .pipe(rename('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(config.publishCssPath));
});

/* 
 * 运行jshint验证config.jsPath下需要检测的js文件代码规范性
 *
 * 并且使用rename和uglify来重命名和压缩文件 
 */

gulp.task('jshint', function() {
    gulp.src(config.scriptList)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    gulp.src(config.rootJsList)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('publishScript', function() {
    if (config.publishScriptIndex === 0) {
        return;
    } else if (config.publishScriptIndex === 1) {
        var cur_task = config.jsTaskList[config.jsTaskListIndex],
            cur_file = 'all-' + (config.jsTaskListIndex + 1) + '.js',
            cur_file_min = 'all-' + (config.jsTaskListIndex + 1) + '.min.js';
        gulp.src(cur_task)
            .pipe(concat(cur_file))
            .pipe(gulp.dest(config.publishJsPath))
            .pipe(rename(cur_file_min))
            .pipe(uglify())
            .pipe(gulp.dest(config.publishJsPath));
    } else if (config.publishScriptIndex === 2) {
        for (var i = 0; i < config.rootJsList.length; i++) {
            var cur_task = config.rootJsList[i];
            gulp.src(cur_task + '.js')
                .pipe(rename(cur_task + '.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./'));
        }
    }
});

/*
 * 运行刷新任务
 *
 * 开启本地服务器，livereload设置为true可以保存的时候进行更新
 */
gulp.task('reload', function() {
    gulp.src('./index.html')
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

    // 运行connect，可在localhost:8080 访问
    gulp.run('connect');

    // 监控js文件，有变化的时候运行jshint  reload命令
    for (var i = 0; i < config.jsTaskList.length; i++) {
        (function(m) {
            gulp.watch(config.jsTaskList[m], function() {
                config.jsTaskListIndex = m;
                config.publishScriptIndex = 1;
                runSequence('jshint', 'publishScript', 'reload');
            });
        })(i);
    }

    gulp.watch(watchRootJsList, function() {
        config.publishScriptIndex = 2;
        runSequence('jshint', 'publishScript', 'reload');
    })

    // 监控less文件，有变化的时候运行less  reload命令
    gulp.watch(config.lessPath + '*', function() {
        runSequence('less', 'publishCss', 'reload');
    });

    // 监控*.html文件，在变化的时候运行reload
    gulp.watch(['./*.html'], function() {
        gulp.run('reload');
    });
});
