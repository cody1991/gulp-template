项目介绍
===

[Gulp:前端构建利器](http://gulpjs.com/) ( [gulp中文网](http://www.gulpjs.com.cn/))，可以很好地用自动化构造工具增强我们的前端开发流程。这个项目是自己写的一套 [gulp模板](https://github.com/cody1991/gulp-template)。

gulp.js的核心部分在gulpfile.js配置文件,可以在 [这里](https://github.com/cody1991/gulp-study/blob/dev/gulpfile.js) 查看文件代码。

使用的模块有：

模块 | 作用 
-----|-----
[jshint](https://github.com/spalger/gulp-jshint) | 检测js代码是否规范
[uglify](https://github.com/terinjokes/gulp-uglify) | 压缩js文件
[Less](https://github.com/plus3network/gulp-less) | CSS预处理语言的
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) | CSS浏览器兼容前缀自动补充
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) | 压缩CSS文件
[concat](https://github.com/wearefractal/gulp-concat) | 文件的合并
[rename](https://github.com/hparra/gulp-rename) | 文件的重命名
[browser-sync](https://www.npmjs.com/package/browser-sync) | 构建本地服务器并带有刷新功能 
[run-sequence](https://www.npmjs.com/package/run-sequence) | 任务能够按照顺序执行
[del](https://www.npmjs.com/package/del) | 删除文件

[HTML5 Boilerplate](http://www.bootcss.com/p/html5boilerplate/) ，在这个网站下可以看到这样的介绍：“HTML5 Boilerplate帮你构建快速，健壮，并且适应力强 的web app或网站。这个小小的源码包集合了100位开发者的经验，你可以将这些经验运用在你的项目中。”更多的细节可以自己看看。我给出的本gulp模板基本结构也是基于HTML5 Boilerplate的。可以在我的 [html5-boilerplate](https://github.com/bear-front-end/html5-boilerplate)仓库中下载，使用了淘宝的[lib-flexible](https://github.com/amfe/lib-flexible)。


项目使用
===

1   下载

    git clone https://github.com/cody1991/gulp-template.git

or
    
    npm install cody-gulp-template


2   安装依赖插件，执行gulp命令
    
    cd 对应目录
    npm install
    gulp

3   运行

    npm run build or gulp build  // 构建css&js文件
    npm run clean or gulp clean  // 删除构建出来的css&js文件
    npm run dev or gulp          // 运行本地服务器

构建说明
===

### js代码规范验证

    gulp.task('jshint', function() {
        gulp.src('./js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });  

当我们在控制台键入

    gulp jshint

就会执行 `jshint` 这个任务，它主要进行的任务是检查所有 js 目录下的 js 文件代码书写是否规范

### 合并压缩js文件

    gulp.task('scripts', function(callback) {
        // 这里可以引入其他js库
        gulp.src(['./js/common.js'])
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./dist/js/'))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js/'))
            .pipe(browserSync.reload({
                stream: true
            }));

        callback();
    });

我们可以在

    gulp.src(['./js/common.js'])

里面的数组按顺序填入我们想要进行合并压缩的js文件，然后把我们所有键入的js文件合并 `concat` 成 all.js 放入 dist/js  目录下，之后我们把它改名字 `rename` 为 all.min.js 并进行 `uglify` 压缩把它也放入 dist/js 目录下。最后通知浏览器进行刷新 `browserSync.reload`(后面会提到)

### less 编译合并压缩

    gulp.task('less', function(callback) {
        // 其余的样式文件都由style.less引入
        gulp.src(['./css/style.less'])
            .pipe(less())
            .pipe(autoprefix({
                browsers: ['last 2 versions'],
            }))
            .pipe(rename('all.css'))
            .pipe(gulp.dest('./dist/css/'))
            .pipe(rename('all.min.css'))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./dist/css/'))
            .pipe(browserSync.reload({
                stream: true
            }));

        callback();
    });

这个地方一般只会配置 css/style.less 文件，其他的css或者less文件都由它引入：

    @import (inline) './normalize.css';

然后我们还进行了 `autoprefix` 的自动补全操作，`cleanCSS` 的压缩操作以及高速浏览器进行刷新 `browserSync.reload` (后面会提到)

### 浏览器自动刷新

    gulp.task('browserSync', function() {
        browserSync({
            server: {
                baseDir: './'
            }
        })
    });

这里就是配置浏览器自动刷新的任务，我们会监控一些文件的变化，然后进行 `browserSync.reload` 的操作

### 监控文件变化

    gulp.task('watch', function() {
        gulp.watch('./js/*.js', function() {
            runSequence('jshint', 'scripts');
        });

        gulp.watch('./css/*.less', ['less']);

        gulp.watch('./*.html', browserSync.reload);
    });

`runSequence` 让我们的任务可以按顺序执行。在检测到 js 文件夹下的文件变化的时候，会按顺序执行 `jshint` 和 `script` 操作，检测到 css 下的文件变化的时候会执行 `less` 操作（一般只有 style.less）。监控到根目录下的 html 文件变化的时候执行 `browserSync.reload` 操作

### 脚本控制

    gulp.task('clean', function(callback) {
        del(['dist/css/', 'dist/js/']);
        callback();
    });

    gulp.task('build', ['clean'], function(callback) {
        runSequence(['less', 'scripts']);
    });

    gulp.task('default', function(callback) {
        runSequence('jshint', ['less', 'scripts', 'browserSync', 'watch'], callback);
    });

我们在 `package.json` 中写入了：

    "scripts": {
        "build": "gulp build",
        "clean": "gulp clean",
        "dev": "gulp"
    },

配置了我们的脚本。

执行 `build` 的时候，主要生成我们合并压缩以后的 js 和 css 文件。
执行 `clean` 的时候，主要是想删除过往的版本先，再生成此次的最新代码文件（因为后期会考虑加入版本号）
执行 `dev` 的时候，代码着开发中，执行一系列的操作，然后在浏览器中键入

    localhost:8080

有个本地服务器，修改文件的时候会自动刷新
