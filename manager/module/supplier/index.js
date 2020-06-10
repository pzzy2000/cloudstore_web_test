function PrivateOpt() {
	
	var params =getQueryParams();
	
	var module = params["module"];
	var parents = params["parents"];
	var own = params["own"];
	$('#parents').html(parents);
	$('#own').html(own);
	loadEmenu(module);
	
	this.initTable = function(params) {
		var mainTable = new MyAppTable({
			tableId : 'table',
			baseUrl : ajaxurl("/sys/module/"),
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
},  {
	title : '模块所属类型',
	field : 'moduleType',
	align : 'left',
	width : '100px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;
	}
},{
	title : '模块名称',
	field : 'name',
	align : 'center',
	width : '200px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;

	}
}, {
	title : 'url',
	field : 'url',
	align : 'center',
	//width : '100px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;
	}
}

, {
	title : '备注',
	field : 'desc',
	align : 'center',
	// width : '200px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;
	}
}, {
	title : '操作',
	// field : 'states',
	align : 'center',
	width : '100px',
	valign : 'middle',
	formatter : function(value, row, index) {
		
		;
	}

} ];