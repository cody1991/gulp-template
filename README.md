项目介绍
====


[Gulp:新一代前端构建利器](http://gulpjs.com/) ( [gulp中文网 ](http://www.gulpjs.com.cn/))，可以很好地用自动化构造工具增强我们的前端开发流程。

这个项目是自己写的一套 [gulp模板](https://github.com/cody1991/gulp-template)。

gulp.js的核心部分在gulpfile.js配置文件,可以在 [这里](https://github.com/cody1991/gulp-study/blob/gh-pages/gulpfile.js) 查看文件代码。

	var gulp = require('gulp'),
	    jshint = require('gulp-jshint'),
	    less = require('gulp-less'),
	    concat = require('gulp-concat'),
	    uglify = require('gulp-uglify'),
	    rename = require('gulp-rename'),
	    minifycss = require('gulp-minify-css'),
	    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
	    connect = require('gulp-connect'),
	    clean = require('gulp-clean'),
	    runSequence = require('run-sequence').use(gulp),
	    rev = require('gulp-rev'),
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
gulp是基于node.js的，在gulpfile.js开头部分我们引入了N个模块。主要是 [gulp](https://github.com/gulpjs/gulp) 本身，检测js代码是否规范的 [jshint](https://github.com/spalger/gulp-jshint) 模块,压缩js文件的 [uglify](https://github.com/terinjokes/gulp-uglify) 模块,CSS预处理语言的 [Less](https://github.com/plus3network/gulp-less) 模块,CSS浏览器兼容前缀自动补充的 [autoprefix](https://github.com/less/less-plugin-autoprefix) 模块,压缩CSS文件的 [minify-css](https://github.com/murphydanger/gulp-minify-css) 模块,文件的合并 [concat](https://github.com/wearefractal/gulp-concat) 模块，以及文件的重命名 [rename](https://github.com/hparra/gulp-rename) 模块，用来删除文件和文件夹的 [gulp-clean](https://www.npmjs.com/package/gulp-clean) 模块，构建本地服务器并带有刷新功能的 [gulp-connect](https://github.com/AveVlad/gulp-connect)模块，让gulp任务能够按照顺序执行的[run-sequence](https://www.npmjs.com/package/run-sequence) 模块， 以及版本控制 [gulp-rev](https://www.npmjs.com/package/gulp-rev/) 模块。

另外在这里提一下 [HTML5 Boilerplate](http://www.bootcss.com/p/html5boilerplate/) ，在这个网站下可以看到这样的介绍：“HTML5 Boilerplate帮你构建快速，健壮，并且适应力强 的web app或网站。这个小小的源码包集合了100位开发者的经验，你可以将这些经验运用在你的项目中。”更多的细节可以自己看看。我给出的本gulp模板基本结构也是基于HTML5 Boilerplate的。可以在我的 [mylib](https://github.com/cody1991/mylib/tree/gh-pages/framwork/singlepage) 项目中下载。

项目结构
===

1	./index.html 
---

入口文件可以看到下面两条，分别是压缩合并后的all.min.css和all-1.min.js文件：

	<link rel="stylesheet" type="text/css" href="./publish/css/all.min.css">

	<script type="text/javascript" src="./publish/js/all-1.min.js"></script>

以及jquery和zepto的cdn地址，如果想要其他版本的话可以在[百度静态资源公共库](http://cdn.code.baidu.com/)获取：
	
	<script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.js"></script>

    <script type="text/javascript" src="http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js"></script>

另外我们如果执行了 gulp online 命令用于发布线上版本，引入的css和js文件要加上随机版本号：
	
	<link rel="stylesheet" type="text/css" href="./publish/online/all-2dd1274587.min.css">

    <script type="text/javascript" src="./publish/online/all-1-a5b69471d8.min.js"></script>



2	./package.json
---

这个包的信息，用于npm下载依赖的模块

	{
	  "name": "cody-gulp-template",
	  "version": "1.0.0",
	  "description": "a gulp template package",
	  "author": "sysutangzxcody",
	  "keywords": [
	    "gulp",
	    "template"
	  ],
	  "license": "MIT",
	  "repository": {
	    "type": "git",
	    "url": "https://github.com/cody1991/gulp-template"
	  },
	  "dependencies": {},
	  "devDependencies": {
	    "gulp": "^3.8.11",
	    "gulp-clean": "^0.3.1",
	    "gulp-concat": "^2.5.2",
	    "gulp-connect": "^2.2.0",
	    "gulp-jshint": "^1.10.0",
	    "gulp-less": "^3.0.3",
	    "gulp-livereload": "^3.8.0",
	    "gulp-minify-css": "^1.1.0",
	    "gulp-rename": "^1.2.2",
	    "gulp-rev": "^6.0.0",
	    "gulp-uglify": "^1.2.0",
	    "less-plugin-autoprefix": "^1.4.1",
	    "run-sequence": "^1.1.2"
	  },
	  "bugs": {
	    "url": "https://github.com/cody1991/gulp-template/issues"
	  },
	  "homepage": "https://github.com/cody1991/gulp-template",
	  "main": "index.html",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  }
	}


3	./src
---

这个文件夹存放的是我们项目中涉及到的所有的css、less和js文件


4	./publish
---

这个文件夹存放的是项目的图片文件./publish/images，以及由./publish/css目录下所有的css文件合并生成的all.min.css和all.css文件，和./publish/js目录下生成的不定数量的all-num.js和all-num.min.js文件，num指的是第几个js文件，从1开始。


5	./gulpfile.js
---

可以 [点击这里](https://raw.githubusercontent.com/cody1991/gulp-template/gh-pages/gulpfile.js) 查看对应的gulp配置文件。平时我们使用命令行工具来到项目文件夹，执行


项目使用
===

1	下载本项目
---

	git clone https://github.com/cody1991/gulp-template.git

or
	
	npm install cody-gulp-template


2	下载依赖插件，执行gulp命令
---
	
	cd 对应目录
	npm install
	gulp

3	生成线上版本
---
	
	gulp online

4	删除线上版本
---

	gulp clean


项目配置
===

在[gulpfile.js](https://raw.githubusercontent.com/cody1991/gulp-template/gh-pages/gulpfile.js)里面我们修改

	var config = {
	    lessList: ['style.less'],
	    // 由用户配置，可输入多个less文件名
	    cssLibList: ['normalize.css'],
	    // 由用户配置，可输入多个外来引入的css文件名，一般项目只引入normalize.css文件
	    scriptList: ['common-1.js', 'common-2.js'],
	    // 由用户配置，这是用户自己编写的js文件，需要通过jshint验证js规范
	    jsTaskList: [
	        ['common-1.js', 'common-2.js'],
	    ],
	    // 由用户配置，代表js文件的各种依赖关系

	    // 由程序生成包含所有位于config.cssPath路径下的css文件
	    allCssList: [],
	    // 下面是路径的设置
	    lessPath: './src/less/', // 代表less文件的基目录
	    cssPath: './src/css/', // 代表所有css文件的基目录
	    publishCssPath: './publish/css/', //代表发布的css的目录
	    jsPath: './src/js/', // 代表所有js文件的基目录
	    publishJsPath: './publish/js/', // 代表发布的js的目录
	    imgPath: './publish/images/', //  代表发布的图片的目录
	    online: './publish/online'
	};

config对象的前四个属性的值来达到自由配置，对应的属性的意思可参看注释
