$(document).ready(function(){

	/*把第一张图clone,如何添加为最后一张图；*/
	var cloneFirshpic = $(".carousel-content>div").first().clone();
	$(".carousel-content").append(cloneFirshpic);

	/*获取设备宽高*/
	var deviceWidth = $(window).width();
	/*获取轮播图数量*/
	var picSum = $(".carousel-content>div").length;
	/*轮播图的位置*/
	var i = 0;
	/*设置轮播图wrapper宽度；*/
	$(".carousel-content").css("width", deviceWidth*picSum+"px");
	$(".carousel-content>div").css("width", deviceWidth+"px");
	$(".carousel-content>div>div").css("height", Math.ceil(deviceWidth*0.56)+"px");

	var t = setInterval(function(){
		carousel();
	}, 2000);

	function carousel() {
		i++;
		if(i == picSum) {
			$(".carousel-content").css({"left": "0px"});
			i = 1;
		}
		$(".carousel-content").stop().animate({"left": -deviceWidth*i+"px"}, 500);
		if(i == picSum-1) {
			$(".carousel-nav-item").eq(0).addClass("selected").siblings().removeClass("selected");
		} else {
			$(".carousel-nav-item").eq(i).addClass("selected").siblings().removeClass("selected");
		}
	};

	$(".header-navigator .menus li a").on("click", function(e){
		e.preventDefault();
		var type = $(this).text();
		$(this).parent().addClass("selected").siblings().removeClass("selected");
		refreshNews(type);
	});


	/*刷新新闻页面；*/
	refreshNews("推荐");

	/*新闻list工厂函数；*/

	function refreshNews(type) {
		$newslistContainer = $("#newslist_container");
		$newslistContainer.empty();
		$.ajax({
			url: '/news',
			type: 'get',
			datatype: 'json',
			data: {newstype: type},
			success: function(data) {
				console.log(data);
				$(data).each(function(index, item){
					$indexListItemContainer = $("<div></div").addClass("index-list-item-container").prependTo($newslistContainer);
					$indexListItem = $("<div></div").addClass("index-list-item").appendTo($indexListItemContainer);
					$indexListMain = $("<div></div").addClass("index-list-main showleft").appendTo($indexListItem);
					$indexListImage = $("<div></div>").addClass("index-list-image").appendTo($indexListMain);
					$("<img>").attr("src", item.newsimg).appendTo($indexListImage);
					$indexListMainText = $("<div></div>").addClass("index-list-main-text").appendTo($indexListMain);
					$("<div></div").addClass("index-list-main-title").html(item.newstitle).appendTo($indexListMainText);
					$indexListBottom = $("<div></div>").addClass("index-list-bottom").appendTo($indexListMainText);
					$indexListMainTime = $("<div></div>").addClass("index-list-main-time").appendTo($indexListBottom);
					$("<p></p>").addClass("tip-time").html(item.newstime).appendTo($indexListMainTime);
				});
			}
		});
	};
});