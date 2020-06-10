function PrivateOpt() {

	var params = getQueryParams();

	var module = params["module"];
	var parents = params["parents"];
	var own = params["own"];
	$('#parents').html(parents);
	$('#own').html(own);
	loadEmenu(module);

	this.initTable = function(params) {
		var mainTable = new MyAppTable({
			tableId : 'table',
			baseUrl : ajaxurl("/sys/manager/user/"),
			tableParams : {
				toolbar : '#toolbar-btn',
				height : document.body.clientHeight - 90,
				columns : TableColumns,
				authload : params.authload
			}
		});
		mainTable.initTable();

		mainDeleteOpt('main_delete', mainTable);

		saveModalWin('main_add', mainTable);

		updateModalWin('main_update', mainTable);

	}

}

var TableColumns = [
		{
			checkbox : true,
			title : '全选',
			valign : 'middle',
			width : '40px',
		},
		{
			title : '姓名',
			field : 'name',
			align : 'center',
			width : '150px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '电话 ',
			field : 'phone',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;

			}
		},
		{
			title : '登录账号',
			field : 'access',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '账号类型',
			field : 'userType',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value=='supplier'?'供应商':'平台';
			}
		}
		,
		{
			title : '创建时间',
			field : 'createDate',
			align : 'center',
			// width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},{
			title : '状态',
			field : 'status',
			align : 'center',
			// width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return '0:正常;1:违规关闭;2:永久关闭';
			}
		}
		,{
			title : '是否删除',
			field : 'isDelete',
			align : 'center',
			// width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value==0?"没删除":"已删除";
			}
		},{
			title : '备注',
			field : 'desc',
			align : 'center',
			// width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '操作',
			// field : 'states',
			align : 'center',
			width : '120px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>关 &nbsp; &nbsp;闭</span></button>';
			}

		} ];