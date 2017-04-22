###gulp与grunt 对比
<ol>
<li>gulp无需写大堆繁杂配置参数</li>
<li>api比grunt简单</li>
<li>用nodejs中的stream来读取和操作数据，速度快因为它不需要频繁生成临时文件</li>
<li>grunt以文件为媒介运行它的工作流，当执行完一个任务会把结果写进一个临时文件中，然后在这个临时文件上执行其他任务</li>
</ol>

###gulp安装
<ol>
<li>cnpm install -g gulp  全局安装gulp</li>
<li>在项目中也要安装，cnpm install --save-dev gulp不会放在dependencies里面而是devdependencies 这样别人用的时候就知道这只是在开发中才会使用的工具</li>
</ol>

###gulp使用
<ol type="i">
<li>建立gulpfile.js</li>
gulp需要一个文件作为主文件，放在项目中，我们的任务就是在里面定义、、

</ol>
	<strong>gulp一个默认任务</strong>
	
		var gulp = require('gulp');
		gulp.task('default',function(){
			console.log('hello,world');
		})

###gulp API
使用gulp仅仅需要知道四个API gulp.task(),gulp.src(),gulp.dest(),gulp.watch()

####gulp.src()是用来获取流，
但这个流不是原始文件里的流，而是一个虚拟文件对象流，也就是获取需要操作问文件

	gulp.src(globs[,options])

`globs`参数是文件匹配模式(正则表达式),用来匹配文件路径，已可以指定某个具体的文件路径，

 `options`是可选参数，通常情况下我们不需要用到

举个例子:
####*
`* `匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾

`*` 能匹配 `a.js,x.y,abc,abc/`,但不能匹配`a/b.js`

`*.*` 能匹配` a.js`,`style.css`,`a.b`,`x.y`

`*/*/*.js `能匹配 `a/b/c.js,x/y/z.js`,不能匹配`a/b.js,a/b/c/d.js`

####**
`**` 匹配路径中的0个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。

`**` 能匹配 `abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b`,能用来匹配所有的目录和文件

`**/*.js` 能匹配 `foo.js,a/foo.js,a/b/foo.js,a/b/c/foo.js`

`a/**/z` 能匹配 `a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z`

`a/**b/z` 能匹配 `a/b/z,a/sb/z`,但不能匹配`a/x/sb/z`,因为只有单`**`单独出现才能匹配多级目录
####?
`? `匹配文件路径中的一个字符(不会匹配路径分隔符)

`?.js` 能匹配 `a.js,b.js,c.js`

`a??` 能匹配 a.b,abc,但不能匹配ab/,因为它不会匹配路径分隔符

####[...]
`[...]` 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似js正则表达式中的用法

`[xyz].js `只能匹配 `x.js,y.js,z.js`,不会匹配`xy.js,xyz.js`等,整个中括号只代表一个字符

`[^xyz].js` 能匹配 `a.js,b.js,c.js`等,不能匹配`x.js,y.js,z.js`

<strong>当有多种匹配模式的时候可以用数组</strong>

	//使用数组的方式来匹配多种文件
	gulp.src(['js/*.js','css/*.css','*.html'])

使用数组的方式还有一个好处就是可以很方便的使用排除模式，在数组中的单个匹配模式前加上`!`即是排除模式，它会在匹配的结果中排除这个匹配，要注意一点的是不能在数组中的第一个元素中使用排除模式

	gulp.src([*.js,'!b*.js']) //匹配所有js文件，但排除掉以b开头的js文件


#####展开模式
此外，还可以使用展开模式。展开模式以花括号作为定界符，根据它里面的内容，会展开为多个模式，最后匹配的结果为所有展开的模式相加起来得到的结果。展开的例子如下：

`a{b,c}d` 会展开为 `abd,acd`

`a{b,}c` 会展开为 `abc,ac`

`a{0..3}d `会展开为 `a0d,a1d,a2d,a3d`

`a{b,c{d,e}f}g` 会展开为 `abg,acdfg,acefg`

`a{b,c}d{e,f}g `会展开为 `abdeg,acdeg,abdeg,abdfg`

###gulp.dest()
该方法用来写文件

	gulp.dest(path[,options])

path为写入文件的路径

options为一个可选参数对象，通常我们不需要用到

<strong>要想理解，我们先看看给它传入的路径参数与最终生成文件的关系</strong>
> 
> gulp工作流一般是这个样子，首先通过gulp.src()获取到我们想处理的文件流，然后把文件流通过pipe()方法导入到gulp插件中，最后通过插件处理在通过pipe()方法导入gulp.dest()
> gulp.dest()方法把流中的内容写入到文件中，这里，我们给gulp.dest（）传入的是路径参数，只能指定要生成文件的目录，不能指定生成文件的文件名，它生成文件的文件名使用的是导入到它的文件流自身的文件名，所以生成的文件名是由导入到它的文件流决定的，即使我们给它传入一个带有文件名的路径参数，然后它也会把这个文件名当作目录名

例如：

	var gulp = require('gulp');
	gulp.src('script/jquery.js')
		.pipe(gulp.dest('dist/foo.js'));
	//最终生成的文件路径为 dist/foo.js/jquery.js,而不是dist/foo.js

如果想要改变文件名可以使用插件<strong>[gulp-rename](https://www.npmjs.com/package/gulp-rename "gulp-rename")</strong>

> 生成的文件路径与我们给gulp.dest()方法传入的路径参数之间的关系。
> gulp.dest(path)生成的文件路径是我们传入的path参数后面再加上gulp.src()中有通配符开始出现的那部分路径。例如

	var gulp=require('gulp')
	//有通配符开始出现的那部分路径为 **/*.js
	gulp.src('script/**/*.js')
		.pipe(gulp.dest('dist'));//最后生成的文件路径为 dist/**/*.js
	//如果 **/*.js 匹配到的文件为 jquery/jquery.js ,则生成的文件路径为 dist/jquery/jquery.js


<b>其他例子</b>

	gulp.src('app/src/**/*.css')//此时base值为app/src

上面我们说的`gulp.dest()`所生成的文件路径的规则，其实也可以理解成，用我们给`gulp.dest()`传入的路径替换掉`gulp.src()`中的base路径，最终得到生成文件的路径。

	gulp.src('app/src/**/*.css') //此时base的值为app/src,也就是说它的base路径为app/src
	//设该模式匹配到了文件 app/src/css/normal.css
	.pipe(gulp.dest('dist')) //用dist替换掉base路径，最终得到 dist/css/normal.css

所以改变base路径后，gulp.dest()生成的文件路径也会改变

	gulp.src(script/lib/*.js) //没有配置base参数，此时默认的base路径为script/lib
    //假设匹配到的文件为script/lib/jquery.js
    .pipe(gulp.dest('build')) //生成的文件路径为 build/jquery.js

	gulp.src(script/lib/*.js, {base:'script'}) //配置了base参数，此时base路径为script
    //假设匹配到的文件为script/lib/jquery.js
    .pipe(gulp.dest('build')) //此时生成的文件路径为 build/lib/jquery.js    
用gulp.dest()把文件流写入文件后，文件流仍然可以继续使用。

####gulp.task()

gulp.task方法用来定义任务.内部使用Orchestrator，其语法为:

	gulp.task(name,[deps],fn)

<ul type="square">
<li>name 任务名</li>
<li>deps 依赖，没依赖则省略为数组，当前任务会在所有以来任务执行完毕后才开始执行</li>
<li>fn 为任务函数，把任务要执行的代码放在里面</li>
</ul>

	gulp.task({'task1',['task001','task002'],function(){
		//do something
	}})

> `gulp`中执行多个任务，可以通过任务依赖来实现。例如我想要执行`one,two,three`这三个任务，那我们就可以定义一个空的任务，然后把那三个任务当做这个空的任务的依赖就行了：

code

	//只要执行default ，one two three就会先被执行
	gulp.task('default',['one','two','three']);

intention:

> 如果任务相互之间没有依赖，任务会按你书写的顺序来执行，如果有依赖的话则会先执行依赖的任务。
> 但是如果某个任务所依赖的任务是异步的，就要注意了，gulp并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务。例如：


	gulp.task('one',function(){
	  //one是一个异步执行的任务
	  setTimeout(function(){
	    console.log('one is done')
	  },5000);
	});
	
	//two任务虽然依赖于one任务,但并不会等到one任务中的异步操作完成后再执行
	gulp.task('two',['one'],function(){
	  console.log('two is done');
	});

task2会在task1执行完成前执行完毕

如果我们想等待异步任务中的异步任务操作完成后再执行后续任务

way_1 callback函数
在异步操作完成后执行一个回调函数通知gulp异步任务完成，回调函数就是任务函数的第一个参数

	gulp.task('one',function(cb){
		setTimeout(function(){
			console.log("one is done");
			cb();
		},5000);
	})
	
 	gulp.task('two',['one'],function(){
		console.log('two was done')
	})
	//two 会在 one 任务异步操作完成后执行

way_2 定义返回一个流对象，适用于任务就是操作gulp.src获取到流的情况

	gulp.task('one',function(cb){
		//拿到流中client/任意/任意.js
		var stream =gulp.src('client/**/*.js')
			.pipe(dosomething())//执行某些异步操作
			.pipe(gulp.dest('build'));
			return stream;
	});
	gulp.task('two'['one'],function(){
		console.log('two was done')；
	})

way3  太复杂，就不写了，

####gulp.watch()

gulp.watch()用来监视文件变化，可以利用它执行相应任务，例如压缩等等

	gulp.watch(glob[,opts],tasks)

<b>glob</b>为要件是文件匹配模式<br>
<b>opts</b>为一个可选的配置对象<br>
<b>tasks</b>为文件变化后要执行的任务<br>

	gulp.task('uglify',function(){
		//do something
	});
	gulp.task('reload',function(){
		//do something
	});
	gulp.watch('js/**/*.js',['uglify','reload']);
	//js/**/*.js 发生改变，则立马执行uglify和reload task

gulp.watch()另外一种使用形式

	gulp.watch(glob[,opts,cb])

//cb参数为一个函数，每当监视的glob发生变化，就会回调cb
并且传入一个对象，该对象包含文件变化的一些信息，type属性为变化类型，可以是added,changed,deleted;path属性为发生变化的文件的路径

	gulp.watch('js/**/*.js',function(event){
		console.log(event.type);//变化类型added为新增，deleted为删除，changed为改变
		console.log(event.path);//变化文件路径
	})

###gulp插件

自动加载插件

使用`gulp-load-plugins`

	npm install --save-dev gulp-load-plugins


> 要使用gulp的插件，首先得用require来把插件加载进来，如果我们要使用的插件非常多，那我们的gulpfile.js文件开头可能就会是这个样子的：
	
	var gulp = require('gulp'),
	    //一些gulp插件,abcd这些命名只是用来举个例子
	    a = require('gulp-a'), 
	    b = require('gulp-b'),
	    c = require('gulp-c'),
	    d = require('gulp-d'),
	    e = require('gulp-e'),
	    f = require('gulp-f'),
	    g = require('gulp-g'),
	    //更多的插件...
	    z = require('gulp-z');   

虽然这没什么问题，但会使我们的gulpfile.js文件变得很冗长，看上去不那么舒服。gulp-load-plugins插件正是用来解决这个问题。
gulp-load-plugins这个插件能自动帮你加载package.json文件里的gulp插件。例如假设你的package.json文件里的依赖是这样的:

	{
	  "devDependencies": {
	    "gulp": "~3.6.0",
	    "gulp-rename": "~1.2.0",
	    "gulp-ruby-sass": "~0.4.3",
	    "gulp-load-plugins": "~0.5.1"
	  }
	}

然后我们可以在`gulpfile.js`中使用`gulp-load-plugins`来帮我们加载插件：

	var gulp = require('gulp');
	//加载gulp-load-plugins插件，并马上运行它
	var plugins = require('gulp-load-plugins')();

然后我们要使用`gulp-rename`和`gulp-ruby-sass`这两个插件的时候，就可以使用`plugins.rename`和`plugins.rubySass`来代替了,也就是原始插件名去掉gulp-前缀，之后再转换为驼峰命名。
实质上gulp-load-plugins是为我们做了如下的转换
	
	plugins.rename = require('gulp-rename');
	plugins.rubySass = require('gulp-ruby-sass');

gulp-load-plugins并不会一开始就加载所有package.json里的gulp插件，而是在我们需要用到某个插件的时候，才去加载那个插件。
最后要提醒的一点是，因为gulp-load-plugins是通过你的package.json文件来加载插件的，所以必须要保证你需要自动加载的插件已经写入到了package.json文件里，并且这些插件都是已经安装好了的。

4.2 重命名

使用`gulp-rename`

	npm install --save-dev gulp-rename

用来重命名文件流中的文件。用`gulp.dest()`方法写入文件时，文件名使用的是文件流中的文件名，如果要想改变文件名，那可以在之前用gulp-rename插件来改变文件流中的文件名。

	var gulp = require('gulp'),
	    rename = require('gulp-rename'),
	    uglify = require("gulp-uglify");
	 
	gulp.task('rename', function () {
	    gulp.src('js/jquery.js')
	    .pipe(uglify())  //压缩
	    .pipe(rename('jquery.min.js')) //会将jquery.js重命名为jquery.min.js
	    .pipe(gulp.dest('js'));
	    //关于gulp-rename的更多强大的用法请参考https://www.npmjs.com/package/gulp-rename
	});

####js文件压缩

使用`gulp-uglify`

	npm install --save-dev gulp-uglify

用来压缩js文件，使用的是uglify引擎

	var gulp = require('gulp'),
	    uglify = require("gulp-uglify");
	 
	gulp.task('minify-js', function () {
	    gulp.src('js/*.js') // 要压缩的js文件
	    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
	    .pipe(gulp.dest('dist/js')); //压缩后的路径
	});

#### css文件压缩

使用`gulp-minify-css`

	npm install --save-dev gulp-minify-css
要压缩css文件时可以使用该插件
	
	var gulp = require('gulp'),
	    minifyCss = require("gulp-minify-css");
	 
	gulp.task('minify-css', function () {
	    gulp.src('css/*.css') // 要压缩的css文件
	    .pipe(minifyCss()) //压缩css
	    .pipe(gulp.dest('dist/css'));
	});

####html文件压缩

gulp-minify-html
	
		npm install --save-dev gulp-minify-html
	
用来压缩html文件
	
	var gulp = require('gulp'),
	    minifyHtml = require("gulp-minify-html");
	 
	gulp.task('minify-html', function () {
	    gulp.src('html/*.html') // 要压缩的html文件
	    .pipe(minifyHtml()) //压缩
	    .pipe(gulp.dest('dist/html'));
	});

####js代码检查

	使用gulp-jshint
	安装：npm install --save-dev gulp-jshint
	用来检查js代码
	
	var gulp = require('gulp'),
	    jshint = require("gulp-jshint");
	 
	gulp.task('jsLint', function () {
	    gulp.src('js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter()); // 输出检查结果
	});

####文件合并

使用`gulp-concat`

	npm install --save-dev gulp-concat

用来把多个文件合并为一个文件,我们可以用它来合并js或css文件等，这样就能减少页面的http请求数了

	var gulp = require('gulp'),
	    concat = require("gulp-concat");
	 
	gulp.task('concat', function () {
	    gulp.src('js/*.js')  //要合并的文件
	    .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
	    .pipe(gulp.dest('dist/js'));
	});

####less和sass的编译

less使用gulp-less

	npm install --save-dev gulp-less
	
	var gulp = require('gulp'),
	    less = require("gulp-less");
	 
	gulp.task('compile-less', function () {
	    gulp.src('less/*.less')
	    .pipe(less())
	    .pipe(gulp.dest('dist/css'));
	});
	sass使用gulp-sass,安装：npm install --save-dev gulp-sass
	
	var gulp = require('gulp'),
	    sass = require("gulp-sass");
	 
	gulp.task('compile-sass', function () {
	    gulp.src('sass/*.sass')
	    .pipe(sass())
	    .pipe(gulp.dest('dist/css'));
	});
#####图片压缩

可以使用`gulp-imagemin`插件来压缩jpg、png、gif等图片。

	npm install --save-dev gulp-imagemin
	
	var gulp = require('gulp');
	var imagemin = require('gulp-imagemin');
	var pngquant = require('imagemin-pngquant'); //png图片压缩插件
	
	gulp.task('default', function () {
	    return gulp.src('src/images/*')
	        .pipe(imagemin({
	            progressive: true,
	            use: [pngquant()] //使用pngquant来压缩png图片
	        }))
	        .pipe(gulp.dest('dist'));
	});
gulp-imagemin的使用比较复杂一点，而且它本身也有很多插件，建议去它的项目主页看看文档

##### 自动刷新

使用`gulp-livereload`插件，

	npm install --save-dev gulp-livereload。
当代码变化时，它可以帮我们自动刷新页面
该插件最好配合谷歌浏览器来使用，且要安装livereload chrome extension扩展插件,不能下载的请自行FQ。

	var gulp = require('gulp'),
	    less = require('gulp-less'),
	    livereload = require('gulp-livereload');
	
	gulp.task('less', function() {
	  gulp.src('less/*.less')
	    .pipe(less())
	    .pipe(gulp.dest('css'))
	    .pipe(livereload());
	});
	
	gulp.task('watch', function() {
	  livereload.listen(); //要在这里调用listen()方法
	  gulp.watch('less/*.less', ['less']);
	});

reference:[http://www.cnblogs.com/2050/p/4198792.html](http://www.cnblogs.com/2050/p/4198792.html "前端构建工具gulp")