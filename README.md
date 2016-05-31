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

[HTML5 Boilerplate](http://www.bootcss.com/p/html5boilerplate/) ，在这个网站下可以看到这样的介绍：“HTML5 Boilerplate帮你构建快速，健壮，并且适应力强 的web app或网站。这个小小的源码包集合了100位开发者的经验，你可以将这些经验运用在你的项目中。”更多的细节可以自己看看。我给出的本gulp模板基本结构也是基于HTML5 Boilerplate的。可以在我的 [signlepage-lib-flexible](https://github.com/cody1991/mylib/tree/gh-pages/framwork/signlepage-lib-flexible) 项目中下载，使用了淘宝的[lib-flexible](https://github.com/amfe/lib-flexible)。


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
