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
			baseUrl : ajaxurl("/goods/"),
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
			title : '商品分名称',
			field : 'goodsName',
			align : 'center',
			width : '150px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		{
			title : '品牌',
			field : 'goodsBrand',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;

			}
		},
		{
			title : '商品货号',
			field : 'goodsNumber',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},
		
		{
			title : '销售价格',
			field : 'salePrice',
			align : 'center',
			// width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},{
			title : '市场价',
			field : 'martPrice',
			align : 'center',
			// width : '200px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value;
			}
		},{
			title : '运费规则',
			field : 'freightRuleBean',
			align : 'center',
			 width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value==null?null:freightRuleBean.name;
			}
		},{
			title : '是否上架',
			field : 'shelfStatus',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value==0?'已下架':'已上架 ';
			}
		},{
			title : '是否审核 ',
			field : 'status',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value==0?'待审核':'已上架 ';
			}
		},{
			title : '是否删除',
			field : 'isDelete',
			align : 'center',
			width : '100px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return value==0?'没删除':'已删除';
			}
		},
		
		
		
		{
			title : '操作',
			// field : 'states',
			align : 'center',
			width : '180px',
			valign : 'middle',
			formatter : function(value, row, index) {
				return '<button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>详情</span></button>'
						+ ' &nbsp; &nbsp; &nbsp; <button id="main_update"  type="button" class="btn btn-success btn-sm" style="display: none1" data-toggle="modal" data-target="#main_joinds_windows"><span>规格及参数 </span></button>';
			}

		} ];