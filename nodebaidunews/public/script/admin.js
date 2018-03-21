$(document).ready(function() {
	var $newstable = $("#newstable .news-tbody");

	/*添加新闻*/
	$("#btnsubmin").click(function(e){
		e.preventDefault();
		if($("#newstitle").val() === "" || $("#newstype").val() === "" || $("#newsimg").val() === "" || $("#newstime").val() === "" || $("#newssrc").val() === "") {
			if($("#newstitle").val() === "") {
				$("#newstitle").parent().addClass("has-error");
			} else {
				$("#newstitle").parent().removeClass("has-error");
			}
			if($("#newstype").val() === "") {
				$("#newstype").parent().addClass("has-error");
			} else {
				$("#newstype").parent().removeClass("has-error");
			}
			if($("#newsimg").val() === "") {
				$("#newsimg").parent().addClass("has-error");
			} else {
				$("#newsimg").parent().removeClass("has-error");
			}
			if($("#newstime").val() === "") {
				$("#newstime").parent().addClass("has-error");
			} else {
				$("#newstime").parent().removeClass("has-error");
			}
			if($("#newssrc").val() === "") {
				$("#newssrc").parent().addClass("has-error");
			} else {
				$("#newssrc").parent().removeClass("has-error");
			}
		} else {
			var dataNews = {
				newstitle: $("#newstitle").val(),
				newstype: $("#newstype").val(),
				newsimg: $("#newsimg").val(),
				newstime: $("#newstime").val(),
				newssrc: $("#newssrc").val()
			};
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					if((xhr.status>=200 && xhr.status < 300) || xhr.status == 304) {
						console.log(xhr.responseText);
						refreshNews();
						$("#newstitle").val("");
						$("#newsimg").val("");
						$("#newstime").val("");
						$("#newssrc").val("");
						$("#newstype").val("推荐");
					} else {
						console.log("Request was unsuccessful: "+ xhr.status);
					}
				}
			};
			xhr.open("POST", "/admin/insert", true);
			xhr.setRequestHeader("Content-type", "application/json");
			data=JSON.stringify(dataNews);
			xhr.send(data);
		}
	})


	refreshNews();
	function refreshNews() {
		$newstable.empty();
		$.ajax({
			type: 'get',
			url: '/admin/getnews',
			datatype: 'json',
			cache: false,
			success: function(data){
				$(data).each(function(index, item){
					$tdid = $("<td></td>").html(item.id);
					$tdnewstype = $("<td></td>").html(item.newstype);
					$tdnewstitle = $("<td></td>").html(item.newstitle);
					$tdnewsimg = $("<td></td>").html(item.newsimg);
					$tdnewstime = $("<td></td>").html(item.newstime);
					$tdnewssrc = $("<td></td>").html(item.newssrc);
					$tdbtn = $("<td></td>");
					$btnEdit = $("<button>").addClass("btn btn-primary btn-xs").html("编辑");
					$btndel = $("<button>").addClass("btn btn-danger btn-xs").html("删除");
					$tdbtn.append($btnEdit, $btndel);
					$tRow = $("<tr>");
					$tRow.append($tdid, $tdnewstype, $tdnewstitle, $tdnewsimg, $tdnewstime, $tdnewssrc, $tdbtn);
					$newstable.append($tRow);
				});
			}
		});
	}


	/*删除新闻*/
	var deleteId = null;
	$newstable.on("click",".btn-danger", function(e){
		$("#deleteModal").modal('show');
		deleteId = $(this).parent().prevAll().eq(5).html();
	})

	$("#deleteModal #confirmDelete").on("click",function(){
		if(deleteId) {
			$.ajax({
				url: '/admin/delete',
				type: 'post',
				data: {newsid: deleteId},
				success: function(data){
					$("#deleteModal").modal('hide');
					refreshNews();
				}
			})
		}
	});

	/*编辑新闻*/
	var updateId = null;
	$newstable.on("click",".btn-primary", function(e){
		$("#updateModal").modal('show');
		updateId = $(this).parent().prevAll().eq(5).html();
		$.ajax({
			url: '/admin/curnews',
			type: 'get',
			data: {newsid: updateId},
			success: function(data){
				$("#unewstitle").val(data[0].newstitle);
				$("#unewstype").val(data[0].newstype);
				$("#unewsimg").val(data[0].newsimg);
				$("#unewstime").val(data[0].newstime);
				$("#unewssrc").val(data[0].newssrc);
			}
		})
	})

	$("#updateModal #confirmUpdate").on("click", function(){
		$.ajax({
			url: '/admin/update',
			type: 'post',
			data: {
				newstitle: $("#unewstitle").val(),
				newstype: $("#unewstype").val(),
				newsimg: $("#unewsimg").val(),
				newstime: $("#unewstime").val(),
				newssrc: $("#unewssrc").val(),
				newsid: updateId
			},
			success: function(data){
				$("#updateModal").css("display", "none");
				$("#updateModal").removeClass("in");
				$(".modal-backdrop").remove();
				refreshNews();
			}
		})
	});

});