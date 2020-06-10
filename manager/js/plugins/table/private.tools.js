//var auth = '1111-1111-1111-1111';
//
//function   ajaxurl(path){
//	return "http://127.0.0.1:8088"+path;
//}
//
//function   tourl(path){
//	location.assign(path);
//}
//
//function getQueryParams(key)
//{
//	var obj = {};   
//	var query = window.location.search.substring(1);
//       var vars = query.split("&");
//       for (var i=0;i<vars.length;i++) {
//               var pair = vars[i].split("=");
//               obj[pair[0]] = decodeURI(pair[1]);
//       }
//       return(obj);
//}
//
//function loadEmenu(key) {
//	
//	$.ajax({
//				type : 'post',
//				url : ajaxurl('/sys/menu/load?module='+key),
//				cache : false,
//				data : {},
//				dataType : 'json',
//				headers : {"auth" :window.localStorage['auth']==null ?auth:window.localStorage['auth']}, //添加请求头部 
//				cache : false,// false是不缓存，true为缓存
//				async : true,// true为异步，false为同步
//				success : function(data) {
//					var e = null;
//
//					for (var i = 0; i < data.result.result.length; i++) {
//
//						var em = data.result.result[i];
//						if (e == null) {
//							e = '<li class="active">' 
//								+ '<a href="#">' 
//								+ '<i class="fa fa-th-large"></i>' 
//								+ '<span class="nav-label">' + em.name + '</span>' 
//								+ '<span class="fa arrow"></span>'
//									+ '</a>';
//							e = e + '<ul class="nav nav-second-level">';
//							for (var c = 0; c < em.childMenus.length; c++) {
//								var cn = em.childMenus[c];
//								e = e + '<li class="active" ><a href="' + cn.url + '">' + cn.name + '</a></li>';
//							}
//							e = e + '</ul></li>';
//						} else {
//							e = e + '<li class="active">' + '<a href="#">' + '<i class="fa fa-th-large"></i>' + '<span class="nav-label">' + em.name + '</span>'
//									+ '<span class="fa arrow"></span>' + '</a>';
//							e = e + '<ul class="nav nav-second-level">';
//							for (var c = 0; c < em.childMenus.length; c++) {
//								var cn = em.childMenus[c];
//								e = e + '<li ><a href="' + cn.url + '">' + cn.name + '</a></li>';
//							}
//							e = e + '</ul></li>';
//						}
//
//					}
//                  
//					$('#side-menu').metisMenu('dispose'); // 参考https://mm.onokumus.com/mm-ajax.html，可以自己研究一下
//					$('#side-menu').append(e);
//					$('#side-menu').metisMenu();
//
//				},
//				error : function(ee) {
//					alert("加载菜单错误  " + ee.statusText);
//				}
//			})
//}
//
//function ajax(params) {
//	$.ajax({
//				type : 'post',
//				url : ajaxurl(params.url),
//				cache : false,
//				data : params.data,
//				dataType : 'json',
//				headers : {"auth" :window.localStorage['auth']==null ?auth:window.localStorage['auth']}, 
//				cache : false,// false是不缓存，true为缓存
//				async : true,// true为异步，false为同步
//				success : function(data) {
//					params.success(data);
//				},
//				error : function() {
//					params.error(error);
//				}
//			})
//}
//
//function ajaxForm(form, params) {
//
//	form.ajaxSubmit({
//				type : "post", // 提交方式
//				dataType : "json", // 数据类型
//				// data : myData,// 自定义数据参数，视情况添加
//				data : (typeof(params.data) == "undefined") ? {} : params.data,
//				url : ajaxurl(params.url), // 请求url
////				headers : {"token" : localStorage.getItem('token')}, //添加请求头部 
//				headers : {"auth" :window.localStorage['auth']==null ?auth:window.localStorage['auth']}, 
//				timeout : 5000,
//				success : function(responseText, statusText, xhr, $form) {
//					if (statusText == 'success') {
//						var data = responseText;
//						// var data = eval('(' + responseText + ')');
//						// var data = JSON.parse(responseText);
//						if (data.success == true) {
//							params.success(data);
//						} else {
//							params.error(data);
//						}
//					} else {
//						params.error({
//									success : false,
//									msg : '数据提交失败，请稍后在试'
//								});
//					}
//				}
//			});
//
//}