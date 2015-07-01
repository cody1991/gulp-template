[gulp案例](https://github.com/cody1991/gulp-demo)

***

2015/07/01
---
修改生成带有时间戳all.js和all.css的方法,把配置的文件放在了 ./lib/config.js 文件中;增加gulp-connect插件,搭建本地的服务器(以及带有保存文件自动刷新的livereload功能);更新gulpfile.js文件;

2015/06/18
---
更新了不少东西,优化gulpfile.js的配置,另外如今是动态生成带有时间戳的all.js和all.css(或者用于发布的online/dist/all.min.js和online/dist/all.min.css)文件,更加懒人化~

2015/06/02
---
修改gulpfile.js,增加online文件夹用于线上发布的版本.

***

最近兴起的[Gulp:新一代前端构建利器](http://gulpjs.com/),[gulp中文网](http://www.gulpjs.com.cn/),可以很好地用自动化构造工具增强我们的前端开发流程.自己写了一套[gulp.js模板](https://github.com/cody1991/gulp-study),就以这个例子来简单说说.

gulp.js的核心部分应该是在gulpfile.js文件,我自己的模板的这个文件在[这个位置](https://github.com/cody1991/gulp-study/blob/gh-pages/gulpfile.js).

	var gulp = require('gulp');
	var jshint = require('gulp-jshint');
	var less = require('gulp-less');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');
	var minifycss = require('gulp-minify-css');
	var lessPluginAutoPrefix = require('less-plugin-autoprefix');
	var connect = require('gulp-connect');

gulp是基于node.js的,开头部分我们引入了N个模块.主要是gulp本身,检测javascript语法是否有错误的jshint模块,压缩javascript文件的uglify模块,CSS预处理语言LESS模块,CSS浏览器兼容前缀自动补充的autoprefix模块,压缩CSS文件的minify-css模块,文件的合并模块concat以及文件的重命名模块rename,最后还有图片的压缩模块imagemin.可以说基本把前端开发的 js / css / image 压缩合并工作都包括进去了.

所以在我们的 [index.html](https://github.com/cody1991/gulp-study/blob/gh-pages/index.html) 文件中,可以看到我们只是简单地引入了一个all.min.css样式文件,一个all.min.js脚本文件,因为gulp已经自动化地帮我们把所有的css和js文件压缩和合并起来了.

另外在这里提一下 [HTML5 Boilerplate](http://www.bootcss.com/p/html5boilerplate/),这个网址下可以看到这样的介绍：“HTML5 Boilerplate 帮你构建 快速, 健壮, 并且 适应力强 的web app或网站.这个小小的源码包集合了100位开发者的经验,你可以将这些经验运用在你的项目中.”更多的细节可以自己看看.我给出的gulp.js的基本模板也是根据这个HTML5 Boilerplate改装的,可以在我的[mylib](https://github.com/cody1991/mylib/tree/gh-pages/framwork/singlepage)中下载.