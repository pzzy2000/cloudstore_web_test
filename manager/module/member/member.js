
function  PrivateOpt(){
	
	this.initTable=function(params) {
			
		var mainTable = new MyAppTable({
			tableId:'table',
			baseUrl : "http://127.0.0.1:18080/sys/member/",
			tableParams : {
				toolbar : '#toolbar-btn',
				height : document.body.clientHeight-90,
				columns : TableColumns,
				authload : params.authload
			}
		});
		
		
		mainTable.initTable();

		mainDeleteOpt('main_delete',mainTable);
		
		saveModalWin('main_add',mainTable);
		
		updateModalWin('main_update',mainTable);
		
	}
	
}

var TableColumns = [ {
	checkbox : true,
	title : '全选',
	valign : 'middle',
	width : '40px',
}
, {
	title : '会员姓名',
	field : 'name',
	align : 'center',
	width : '200px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;

	}
}
, {
	title : '登录名',
	field : 'access',
	align : 'center',
	width : '200px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;
	}
}
, {
	title : '备注',
	field : 'remarks',
	align : 'center',
//	width : '200px',
	valign : 'middle',
	formatter : function(value, row, index) {
		return value;
	}
} ,{
	title : '操作',
	//field : 'states',
	align : 'center',
	width : '50px',
	valign : 'middle',
	formatter : function(value, row, index) {
		
		}
	
}];