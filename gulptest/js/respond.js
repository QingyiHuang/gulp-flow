$(document).ready(function(){
		var length;
		var currentIndex = 0;//当前选中的button index
		var interval;
		var hasStarted = false; //是否已经开始轮播
		var timer = 3000;
	//获取图片数量
		length = $('.Carousel-panel') .length;
	//激活第一张图片
	    $('.Carousel-panel:not(:first)').hide();
	//激活一个button
		$('.Carbutton:first').addClass('buttonActive');
	//隐藏按钮
		$('.slider-page').hide();
	//鼠标怡上去显示按钮 jq对立事件内部‘，’
	//移上去取消自动播放 否则自动播放
	//hover 和mouseover区别在于前者自带移入移除
		$('.Carousel-panel,.slider-pre,.slider-next').hover(
			function(){
				stop();//停止轮播
				$('.slider-page').show();
			},
			function(){
				$('.slider-page').hide();
				start();//离开则轮播开始
		});


		
	//hover button图片 传递值 
	////兼容ff浏览器重新定义e为 e = window.event || e;
		
		e = window.event || e;
		$('.Carbutton').hover(function(e){
			//hover事件传入停止轮播
			stop();
			//给preIndex传入筛选后按钮中状态为激活的index值
			var preIndex =$('.Carbutton').filter('buttonActive').index();
			//当前点击对象传入信息中的index值传给current
			currentIndex =$(this).index();
			//把两个参数传入到翻页函数 从preIndex页翻到currentIndex页 
			play(preIndex,currentIndex);
		},//否则执行轮播
		function(){
			start();
	});

		//pre按钮向前翻页js类似addlistenner监听事件
		$('.slider-pre').unbind('click');
		$('.slider-pre').bind('click',function(){
			pre();
		});
	//next按钮
    	$('.slider-next').unbind('click');	
  		$('.slider-next').bind('click', function() { 
  			 next(); 
 		}); 
  	//向前翻页
  		
  		function pre(){
  			var preIndex=currentIndex;
  			//这是约瑟夫算法核心转圈部分
  			currentIndex=(--currentIndex+length)%length;
  			play(preIndex,currentIndex);
  		};
  	//向后翻页
  		function next(){
  			var preIndex=currentIndex;
  			//++3==4  4%4=0;
  			currentIndex= ++currentIndex %length;
  			play(preIndex,currentIndex);
  		};

//从preIndex页翻到currentIndex页 
	function play(preIndex,currentIndex){
		$('.Carousel-panel').eq(preIndex).fadeOut(500)//老图执行fadeOut
		.parent().children().eq(currentIndex).fadeIn(1000);
		//	并且选中其所有的兄弟元素可以用sibling（）匹配
		//	第二个参数fadein
		//	对button操纵移除所有的效果
		$('.Carbutton').removeClass('buttonActive');
		//对匹配的新button  addclass
		$('.Carbutton').eq(currentIndex).addClass('buttonActive');
	};


  	/** 开始轮播 */
  		function start(){
  			if(!hasStarted){
  				hasStarted=true;
  				interval=setInterval(next,timer);
  			}
  		};
  	/*停止轮播 */

  		function stop(){
  			clearInterval(interval);
  			hasStarted=false;
  		}

  
  		start();
});