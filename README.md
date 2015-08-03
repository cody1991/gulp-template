项目介绍
====


最近兴起的 [Gulp:新一代前端构建利器](http://gulpjs.com/) ( [gulp中文网 ](http://www.gulpjs.com.cn/))，可以很好地用自动化构造工具增强我们的前端开发流程。

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

gulp是基于node.js的，在gulpfile.js开头部分我们引入了N个模块。主要是 [gulp](https://github.com/gulpjs/gulp) 本身，检测js代码是否规范的 [jshint](https://github.com/spalger/gulp-jshint) 模块,压缩js文件的 [uglify](https://github.com/terinjokes/gulp-uglify) 模块,CSS预处理语言的 [Less](https://github.com/plus3network/gulp-less) 模块,CSS浏览器兼容前缀自动补充的 [autoprefix](https://github.com/less/less-plugin-autoprefix) 模块,压缩CSS文件的 [minify-css](https://github.com/murphydanger/gulp-minify-css) 模块,文件的合并 [concat](https://github.com/wearefractal/gulp-concat) 模块，以及文件的重命名 [rename](https://github.com/hparra/gulp-rename) 模块。

另外在这里提一下 [HTML5 Boilerplate](http://www.bootcss.com/p/html5boilerplate/) ，在这个网站下可以看到这样的介绍：“HTML5 Boilerplate帮你构建快速，健壮，并且适应力强 的web app或网站。这个小小的源码包集合了100位开发者的经验，你可以将这些经验运用在你的项目中。”更多的细节可以自己看看。我给出的本gulp模板基本结构也是基于HTML5 Boilerplate的。可以在我的 [mylib](https://github.com/cody1991/mylib/tree/gh-pages/framwork/singlepage) 项目中下载。

项目结构
===

1	./index.html 
---

入口文件

	// GulpTemplate是用来生成带有时间戳的css或js文件所用
	// GulpTemplate.addAllCss方法可以用于载入all.css或all.min.css;
	// GulpTemplate.isProduction用于判定是否生成线上文件
	(function(d) {
        // 最后这个地方要换成true表示发布版本，这样可以带动 ./online 引入压缩后的all.min.js和all.min.css文件，因为发布版本是不会出现压缩前的文件的
        GulpTemplate.isProduction = true;
        GulpTemplate.addAllCss('./publish/css/all');
    })(document);

	//javascript_list是载入的js文件列表
	//GulpTemplate.addJavascript载入js文件
	//和上面的css文件一样不需要添加后缀
	(function(d) {
        var javascript_list = ['./publish/js/all-0', './publish/js/all-1'];
        for (var i = 0; i < javascript_list.length; i++) {
            GulpTemplate.addJavascript(javascript_list[i]);
        }
    })(document);

2	./package.json
---

这个包的信息，用于npm下载依赖的模块

	{
	    "name": "gulp-template",
	    "version": "0.0.2",
	    "description": "a gulp template package",
	    "author": "cody1991",
	    "keywords": [
	        "gulp",
	        "template"
	    ],
	    "license": "MIT",
	    "repository": "https://github.com/cody1991/gulp-template",
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
	        "gulp-uglify": "^1.2.0",
	        "less-plugin-autoprefix": "^1.4.1"
	    }
	}

3	config.js / config.min.js
---
	
此处用于动态加载带有时间戳的css和js文件

	(function(d) {
	    var GulpTemplate = {
	        'isProduction': true
	    };
	    window.GulpTemplate = GulpTemplate;
	    var now = new Date();
	    var nowString = {
	        hours: now.getHours(),
	        min: now.getMinutes(),
	        sec: now.getSeconds()
	    }
	    var addString = '';
	    for (item in nowString) {
	        if (nowString[item] < 10) {
	            nowString[item] = '0' + nowString[item];
	        }
	        addString += nowString[item];
	    }
	    GulpTemplate.addString = addString;
	    GulpTemplate.addAllCss = function(src) {
	        GulpTemplate.isProductionString = GulpTemplate.isProduction ? '.min' : '';
	        var head = d.getElementsByTagName('head')[0];
	        var linkTag = d.createElement('link');
	        linkTag.setAttribute('rel', 'stylesheet');
	        linkTag.setAttribute('type', 'text/all');
	        linkTag.href = src + GulpTemplate.isProductionString + '.css' + '?' + GulpTemplate.addString;
	        head.appendChild(linkTag);
	    }
	    GulpTemplate.addAllJavascript = function(src) {
	        GulpTemplate.isProductionString = GulpTemplate.isProduction ? '.min' : '';
	        var body = d.getElementsByTagName('body')[0];
	        var scriptTag = d.createElement('script');
	        scriptTag.setAttribute('type', 'text/javascript');
	        scriptTag.src = src + GulpTemplate.isProductionString + '.js' + '?' + GulpTemplate.addString;
	        body.appendChild(scriptTag);
	    }
	})(document);

4	./src
---

这个文件夹存放的是我们最原始的自己编写的custom js文件(./src/js)，外部引入的框架文件(./src/lib)以及自己编写的less文件(./src/less)。

5	./dist
---

通过gulp由./src生成的js和css文件会被分别放在./dist/css和./dist/js文件夹中

6	./publish
---

这个文件夹存放的是项目的图片文件./publish/images，以及由./dist/css目录下所有的css文件合并生成的all.min.css和all.css文件，和由./dist/js目录下生成的不定数量的all-num.js和all-num.min.js文件，num指的是第几个js文件，从0开始。

7	./production
---

这个是用于线上发布的文件夹，里面有项目的所有html文件，以及在./production/publish下面有从./publish拷贝出来的压缩后的js文件，压缩后的css文件以及图片文件。

8	./gulpfile.js
---

可以 [点击这里](https://raw.githubusercontent.com/cody1991/gulp-template/gh-pages/gulpfile.js) 查看对应的gulp配置文件。平时我们使用命令行工具来到项目文件夹，执行

	gulp

命令就可以按照配置文件里面设定的默认事件来运行起来。而执行

	gulp online

命令的话会生成一个 ./production 文件夹，生成用于发布的版本。

而具体项目的配置还要在此文件下设置。（这也是目前一个不太好的地方，待修改）。

使用
===

1. 下载本项目
---

	git clone https://github.com/cody1991/gulp-template.git

or
	
	npm install cody-gulp-template


2. 下载依赖插件，执行gulp命令
---
	
	cd 对应目录
	npm install
	gulp

3. 生成线上版本
---
	
	gulp online

4. 删除线上版本
---

	gulp clean

因为考虑到在线版本会生成一些以前存在但是已经删除了的文件，直接把整个 ./production 文件删除再重新生成一个干净的在线版本还是不错的。
