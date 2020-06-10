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
			baseUrl : ajaxurl("/goods/property/"),
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
			title : '商品分类(规格/属性)',
			field : 'propertyName',
			align : 'center',
			width : '150px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '规格数量 ',
			field : 'specificationsNumber',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;

			}
		},
		{
			title : '参数数量',
			field : 'parametersNumber',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		}

		,
		{
			title : '描述',
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
			width : '220px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>规格管理</span></button>'
						+ ' &nbsp; &nbsp; &nbsp; <button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>参数管理</span></button>';
			}

		} ];