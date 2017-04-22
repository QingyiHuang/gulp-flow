$(document).ready(function(){
			
			$('#goods').addClass("specialButton");
			$('#goods').css("color","#fff");

			$('#goods').click(function(){
				$('#goods').addClass("specialButton");
				$('#goods').css("color","#fff");
				$('#shop').css("color","#4d4d4d");
				$('#shop').removeClass("specialButton")
			})

			$('#shop').click(function(){
				$('#shop').addClass("specialButton");
				$('#shop').css("color","#fff");
				$('#goods').css("color","#4d4d4d");				
				$('#goods').removeClass("specialButton")
			})


				$('#canvas').css("border","1px solid #cccccc");
				$('#canvas').css("border-bottom","2px solid #fff");
				$('.noticeBlock1').css("display","block");
				$('.noticeBlock1').css("border","1px solid #cccccc");
				$('#announce').css("border","0px")
			$('#canvas').mouseover(function(){
				$('#canvas').css("border","1px solid #cccccc");
				$('#canvas').css("border-bottom","2px solid #fff");
				$('#announce').css("border","0px")
				$('.noticeBlock1').css("display","block");
				$('.noticeBlock1').css("border","1px solid #cccccc");
				$('.noticeBlock2').css("display","none");
			})

			$('#announce').mouseover(function(){
				$('#canvas').css("border","0px");
				$('#announce').css("border","1px solid #cccccc")
				$('#announce').css("border-bottom","2px solid #fff");
				$('.noticeBlock1').css("display","none");
				$('.noticeBlock2').css("display","block");
				$('.noticeBlock2').css("border","1px solid #cccccc");
			});

		$('.supermarket,.shoppingCart,.buy').hover(function(){
			$('.buy').css("display","block");},
			function(){
			$('.buy').css("display","none");
		})

		var w=0;
		var m=0;
		$('.s1').click(function(){
			++w;
			m=m+3;
			sum();
			getit();
		});
		$('.s2').click(function(){
			++w;
			m=m+7;
			sum();
			getit();
		});
		$('.s3').click(function(){
			++w;
			m=m+8;
			sum();
			getit();
		});
		$('.s4').click(function(){
			++w;
			m=m+2;
			sum();
			getit();
		});
		function sum(){
		$('.size').text(w);
		$('.goldscost').text(m);}

		function getit(){
		//	$('.get_it').css("display","block")
			$('.get_it').fadeIn(800);
			$('.get_it').fadeOut(800);
		}

		function showtime(){
		var mydate=new Date();
		var t=mydate.toLocaleString();
		$('.calender_time').text(t);
		}
		setInterval(showtime,1000);
});