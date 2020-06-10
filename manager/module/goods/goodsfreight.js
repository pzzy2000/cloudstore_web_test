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
			baseUrl : ajaxurl("/goods/fee/template/"),
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
			title : '模板名字',
			field : 'name',
			align : 'center',
			width : '150px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '计算公式 ',
			field : 'specificationsNumber',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;

			}
		},
		{
			title : '描述',
			field : 'feeDescription',
			align : 'center',
			//width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '操作',
			// field : 'states',
			align : 'center',
			width : '220px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>详情</span></button>'
						+ ' &nbsp; &nbsp; &nbsp; <button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>修改</span></button>';
			}

		} ];