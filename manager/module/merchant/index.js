function PrivateOpt() {
	loadEmenu('s');
	this.initTable = function(params) {
		var mainTable = new MyAppTable({
			tableId : 'table',
			baseUrl : "http://127.0.0.1:18080/sys/merchant/",
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

var TableColumns = [ {
	checkbox : true,
	title : '全选',
	valign : 'middle',
	width : '40px',
}, {
	title : '商家名称',
	field : 'name',
	align : 'left',
	width : '300px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;

	}
}, {
	title : '联系电话',
	field : 'phone',
	align : 'left',
	width : '100px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;
	}
}

, {
	title : '备注',
	field : 'remarks',
	align : 'left',
	// width : '200px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;
	}
}, {
	title : '会员名称',
	field : 'access',
	align : 'left',
	width : '200px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return '老吴开发客户';
	}
}, {
	title : '操作',
	// field : 'states',
	align : 'center',
	width : '100px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>入驻电商</span></button>'
		  ;
		;
	}

} ];