function   url(path){
	return "http://127.0.0.1:8088"+path;
}

function   tourl(url){
	location.assign( url );
}

function loadEmenu(key) {
	$.ajax({
				type : 'post',
				url : url('/sys/menu/load'),
				cache : false,
				data : {},
				dataType : 'json',
				cache : false,// false是不缓存，true为缓存
				async : true,// true为异步，false为同步
				success : function(data) {
					var e = null;

					for (var i = 0; i < data.result.length; i++) {

						var em = data.result[i];
						if (e == null) {
							e = '<li>' + '<a href="#">' + '<i class="fa fa-th-large"></i>' + '<span class="nav-label">' + em.name + '</span>' + '<span class="fa arrow"></span>'
									+ '</a>';
							e = e + '<ul class="nav nav-second-level">';
							for (var c = 0; c < em.childMenus.length; c++) {
								var cn = em.childMenus[c];
								e = e + '<li ><a href="' + cn.url + '">' + cn.name + '</a></li>';
							}
							e = e + '</ul></li>';
						} else {
							e = e + '<li>' + '<a href="#">' + '<i class="fa fa-th-large"></i>' + '<span class="nav-label">' + em.name + '</span>'
									+ '<span class="fa arrow"></span>' + '</a>';
							e = e + '<ul class="nav nav-second-level">';
							for (var c = 0; c < em.childMenus.length; c++) {
								var cn = em.childMenus[c];
								e = e + '<li ><a href="' + cn.url + '">' + cn.name + '</a></li>';
							}
							e = e + '</ul></li>';
						}

					}

					$('#side-menu').metisMenu('dispose'); // 参考https://mm.onokumus.com/mm-ajax.html，可以自己研究一下
					$('#side-menu').append(e);
					$('#side-menu').metisMenu();

				},
				error : function(ee) {
					alert("加载菜单错误  " + ee.msg);
				}
			})
}

function ajax(params) {
	$.ajax({
				type : 'post',
				url : params.url,
				cache : false,
				data : params.data,
				dataType : 'json',
				cache : false,// false是不缓存，true为缓存
				async : true,// true为异步，false为同步
				success : function(data) {
					params.success(data);
				},
				error : function() {
					params.error(error);
				}
			})
}

function ajaxForm(form, params) {

	form.ajaxSubmit({
				type : "post", // 提交方式
				dataType : "json", // 数据类型
				// data : myData,// 自定义数据参数，视情况添加
				data : (typeof(params.data) == "undefined") ? {} : params.data,
				url : params.url, // 请求url
				timeout : 5000,
				success : function(responseText, statusText, xhr, $form) {
					if (statusText == 'success') {
						var data = responseText;
						// var data = eval('(' + responseText + ')');
						// var data = JSON.parse(responseText);
						if (data.success == true) {
							params.success(data);
						} else {
							params.error(data);
						}
					} else {
						params.error({
									success : false,
									msg : '数据提交失败，请稍后在试'
								});
					}
				}
			});

}