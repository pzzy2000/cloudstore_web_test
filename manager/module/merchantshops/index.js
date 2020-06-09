function PrivateOpt() {

	this.initTable = function(params) {
		var mainTable = new MyAppTable({
			tableId : 'table',
			baseUrl : "http://127.0.0.1:18080/sys/merchant/shops/",
			tableParams : {
				toolbar : '#toolbar-btn',
				height : document.body.clientHeight - 90,
				columns : TableColumns,
				authload : params.authload
			}
		});
		mainTable.initTable();

		mainDeleteOpt('main_delete', mainTable);

		// saveModalWin('main_add', mainTable);

		// updateModalWin('main_update', mainTable);

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
			title : '店铺名称',
			field : 'name',
			align : 'left',
			width : '300px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;

			}
		},
		{
			title : '店铺类别',
			field : 'ebusinessType',
			align : 'left',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		}

		,
		{
			title : '备注',
			field : 'remarks',
			align : 'left',
			// width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '商家名称',
			field : 'access',
			align : 'left',
			width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return '老吴开发客户';
			}
		},
		{
			title : '操作',
			// field : 'states',
			align : 'center',
			width : '280px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_update_windows"><span>仓库管理</span></button>'
				  +'<span>&nbsp;&nbsp;</span>'+
				  '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_update_windows"><span>品牌管理</span></button>'
				  +'<span>&nbsp;&nbsp;</span>'+
				  '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_update_windows"><span>参数设置</span></button>'
				  ;
				;
			}

		} ];