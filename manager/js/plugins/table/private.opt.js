var auth = '1111-1111-1111-1111';

function   ajaxurl(path){
	return "http://127.0.0.1:8088"+path;
}

function   tourl(path){
	location.assign(path);
}

function getQueryParams(key)
{
	var obj = {};   
	var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               obj[pair[0]] = decodeURI(pair[1]);
       }
       return(obj);
}

function loadEmenu(key) {

$.ajax({
			type : 'post',
			url : ajaxurl('/sys/menu/load?module='+key),
			cache : false,
			data : {},
			dataType : 'json',
			headers : {"auth" :window.localStorage['auth']==null ?auth:window.localStorage['auth']}, //添加请求头部 
			cache : false,// false是不缓存，true为缓存
			async : true,// true为异步，false为同步
			success : function(data) {
				
				if(data.result.code<0){
					alert(data.result.msg);
					tourl("/manager/module/login/login.html");
					return;
				}
				
				var e = null;

				for (var i = 0; i < data.result.result.length; i++) {

					var em = data.result.result[i];
					if (e == null) {
						e = '<li class="active">' 
							+ '<a href="#">' 
							+ '<i class="fa fa-th-large"></i>' 
							+ '<span class="nav-label">' + em.name + '</span>' 
							+ '<span class="fa arrow"></span>'
								+ '</a>';
						e = e + '<ul class="nav nav-second-level">';
						for (var c = 0; c < em.childMenus.length; c++) {
							var cn = em.childMenus[c];
							e = e + '<li class="active" ><a href="' + cn.url + '">' + cn.name + '</a></li>';
						}
						e = e + '</ul></li>';
					} else {
						e = e + '<li class="active">' + '<a href="#">' + '<i class="fa fa-th-large"></i>' + '<span class="nav-label">' + em.name + '</span>'
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
				alert("加载菜单错误  " + ee.statusText);
			}
		})
}


// 绑定模态
function ajax(params) {
	$.ajax({
				type : 'post',
				url : ajaxurl(params.url),
				cache : false,
				data : params.data,
				dataType : 'json',
				headers : {"auth" :window.localStorage['auth']==null ?auth:window.localStorage['auth']}, //添加请求头部 
				cache : false,// false是不缓存，true为缓存
				async : true,// true为异步，false为同步
				success : function(data) {
					params.success(data);
				},
				error : function(error) {
					if (error.status == 0)
						error.msg = "服务没启动";
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
				headers : {"auth" :window.localStorage['auth']==null ?auth:window.localStorage['auth']}, //添加请求头部 
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
function formReset(modalWin, isAllReset) {
	var form = modalWin.find('form');
	if (form.length == 0)
		return;
	if (isAllReset == true) {
		form.find('.select2[type=ajax]').find("option").remove();
		form.find('.select2').val(null).trigger('change');
		// form.find('.select2').empty();
		form.bootstrapValidator('resetForm', true);
		form.resetForm();
	} else {
		form.bootstrapValidator('resetForm', false);
	}

}

function modalWinIsSubmit(modalWin) {
	return modalWin.isSubmiting;
}
function closeModalWin(modalWin) {
	var submit = modalWin.find('#submit');
	modalWinSubmit(modalWin, false, null);
	setTimeout(function() {
				modalWin.modal('hide');
				formReset(modalWin, true);
				modalWin.find('#msg').html('');
				modalWin.find('#size').html('');
			}, 1000);
}

function modalWinSubmit(modalWin, isSubmit, msginfo) {
	modalWin.isSubmiting = isSubmit;
	if (msginfo != null)
		msg(modalWin, msginfo);
	var submit = modalWin.find('#submit');
	if (isSubmit == true) {
		submit.button('loading').delay(1000).queue(function() {
					submit.dequeue();
				});
	} else {
		submit.button('reset');
	}

}
function msg(modalWin, msg) {
	modalWin.find('#msg').html(msg);
}

function modalWincloseEvent(modalWin, clearmsg) {
	var submit = modalWin.find('#submit');
	if (clearmsg == true) {
		modalWin.find('#msg').html('');
		modalWin.find('#size').html('');
	}
	formReset(modalWin, true);
	buttonReset(submit);
}
function buttonReset(submitBt) {
	submitBt.button('reset');
}

function mainDeleteOpt(buttonId, mainTable) {
	// 模态
	var button = jQuery('#' + buttonId);
	var modalWin = jQuery('#' + button.attr('id') + "_windows");
	modalWinSubmit(modalWin, false, null);
	modalWin.on('hide.bs.modal', function() {
				if (modalWinIsSubmit(modalWin) == true) {
					errorMsg(modalWin, '正在提交数据,请勿关闭窗口');
					return false;
				} else {
					modalWincloseEvent(modalWin, true);
					return true;
				}
			});
	modalWin.on('show.bs.modal', function() {
				var getSelectRows = mainTable.getTableSelectRows();

				modalWin.find('#delSize').html(getSelectRows.length);
			});
	var submit = modalWin.find('#submit');
	submit.bind("click", function() {
				if (modalWinIsSubmit(modalWin) == true) {
					errorMsg(modalWin, '正在提交数据请勿重复提!');
					return;
				}

				msg(modalWin, '正在提交要删除的数据,请勿关闭窗口');
				modalWinSubmit(modalWin, true, null);
				var getSelectRows = mainTable.getTableSelectRows();
				if (getSelectRows.length == 0) {
					msg(modalWin, '请选择要删除的数据!');
					modalWinSubmit(modalWin, false, null);
					return;
				}
				// var selectIds='optType=remove';
				var delTableIds = [];
				for (var i = 0; i < getSelectRows.length; i++) {
					// selectIds=selectIds+"&"+'bean.uuides='+getSelectRows[i].id;
					delTableIds.push(getSelectRows[i].id);
				}
				var form = modalWin.find('form');
				if (form.length == 0) {
					ajax({
								url : mainTable.getBaseUrl() + 'delete',
								data : {
									optType : 'remove',
									'bean.ids' : delTableIds
								},
								success : function(data) {
									if (data.success === false) {
										modalWinSubmitError(modalWin, '提交数据失败,删除了' + getSelectRows.length + '条数据没有成功 \r\n [' + data.msg + ']');
									} else {
										mainTable.removeRows(delTableIds);
										msg(modalWin, '删除数据成功');
										closeModalWin(modalWin);
									}

								},
								error : function(data) {
									modalWinSubmit(modalWin, false, null);
									msg(modalWin, '提交数据失败,删除了' + getSelectRows.length + '条数据没有成功  ！ [' + data.msg + ']');
									// tableEvent('button', submit.attr('opt'),
									// data);
								}
							});
				} else {
					var bootstrapValidator = form.bootstrapValidator('validate');
					if (form.data('bootstrapValidator').isValid()) {
						modalWinSubmit(modalWin, true, '正在提交要删除的数据,请勿关闭窗口');
						ajaxForm(form, {
									url : baseUrl + 'delete',
									data : {
										'bean.uuides' : delTableIds,
										optType : 'remove'
									},
									success : function(data) {
										removeRows(delTableIds);
										modalWinSubmitSuccess(modalWin, '提交数据成功,共删除了' + data.result.length + '条数据');
										closeModalWin(modalWin);
										tableEvent('button', submit.attr('opt'), data);
									},
									error : function(data) {
										modalWinSubmitError(modalWin, '提交数据失败,删除了' + getSelectRows.length + '条数据没有成功 \r\n [' + data.msg + ']');
										tableEvent('button', submit.attr('opt'), data);

									}
								})
					} else {
						modalWinSubmitError(modalWin, '提交的数据不符合相应的格式');
					}
				}

			});

}

function saveModalWin(buttonId, mainTable) {
	var button = jQuery('#' + buttonId);
	var modalWin = jQuery('#' + button.attr('id') + "_windows");
	modalWinSubmit(modalWin, false, null);
	var form = modalWin.find('form');
	form.bootstrapValidator();
	modalWin.on('hide.bs.modal', function() {
				if (modalWinIsSubmit(modalWin) == true) {
					errorMsg(modalWin, '正在提交数据,请勿关闭窗口');
					return false;
				} else {
					modalWincloseEvent(modalWin, true);
					return true;
				}
			});
	var submit = modalWin.find('#submit');
	submit.bind("click", function() {
				if (modalWinIsSubmit(modalWin) == true) {
					MyappErrorMsg('数据提交', '正在提交数据请勿重复提交', 1);
					return;
				}
				var form = modalWin.find('form');
				var bootstrapValidator = form.bootstrapValidator('validate');
				if (form.data('bootstrapValidator').isValid()) {
					modalWinSubmit(modalWin, true, '正在提交数据请勿重复提交,请勿关闭窗口');
					// var data = (typeof(intParams.mainTableCallback) ==
					// 'function') ? intParams.mainTableCallback({
					// action : 'save'
					// }) : {};
					var data = {};
					data.optType = 'save';
					ajaxForm(form, {
								url : mainTable.getBaseUrl() + 'save',
								data : data,
								success : function(data) {
									formReset(modalWin, true);
									mainTable.instRow(data.result.result);
									modalWinSubmit(modalWin, false, '数据提交成功');
									closeModalWin(modalWin);
								},
								error : function(data) {
									formReset(modalWin, false);
									modalWinSubmitError(modalWin, '提交数据失败  \r\n [' + data.msg + ']');
								}
							})
				} else {
					modalWinSubmit(modalWin, false, '提交的数据不符合相应的格式');
				}
			});
}

function updateModalWin(buttonId, mainTable) {

	var button = jQuery('#' + buttonId);
	var modalWin = jQuery('#' + button.attr('id') + "_windows");
	modalWinSubmit(modalWin, false, null);
	modalWin.on('hide.bs.modal', function() {
				if (modalWinIsSubmit(modalWin) == true) {
					errorMsg(modalWin, '正在提交数据,请勿关闭窗口');
					return false;
				} else {
					modalWincloseEvent(modalWin, true);
					return true;
				}
			});
	modalWin.on('show.bs.modal', function() {
				var getSelectRows = mainTable.getTableSelectRows();
				if (getSelectRows.length == 0) {
					modalWinSubmit(modalWin, false, '请选择要更新的数据');
					closeModalWin(modalWin);
				} else if (getSelectRows.length > 1) {
					modalWinSubmit(modalWin, false, '选择更新的数据数量不对');
					closeModalWin(modalWin);
				} else {
					modalWin.find('form').setForm(getSelectRows[0]);
				}

			});
	var submit = modalWin.find('#submit');
	submit.bind("click", function() {
		       var btn = $(this).button('loading');
				if (modalWinIsSubmit(modalWin) == true) {
					MyappErrorMsg('数据提交', '正在提交数据请勿重复提交', 1);
					return;
				}

				var form = modalWin.find('form');
				// initForm(form);
				var bootstrapValidator = form.bootstrapValidator('validate');
				if (form.data('bootstrapValidator').isValid() == false) {
					modalWinSubmit(modalWin, false, '提交的数据不符合相应的格式');
					return;
				}
				if (form.data('bootstrapValidator').isValid()) {
					modalWinSubmit(modalWin, true, '正在提交数据,请勿关闭窗口');
					var getSelectRows = mainTable.getTableSelectRows();
					ajaxForm(form, {
								url : mainTable.getBaseUrl() + 'save',
								data : {
									optType : 'update',
									'bean.id' : getSelectRows[0].id
								},
								success : function(data) {
									modalWinSubmit(modalWin, false, '更新数据成功');
									mainTable.updateRow({
												id : data.result.id,
												row : data.result
											});
									modalWinSubmit(modalWin, false, '更新数据提交成功');
									closeModalWin(modalWin);
									// formReset(modalWin, true);
								},
								error : function(data) {
									modalWinSubmit(modalWin, false, '更新数据失败  \r\n [' + data.msg + ']');

								}
							})
				}
			});

}