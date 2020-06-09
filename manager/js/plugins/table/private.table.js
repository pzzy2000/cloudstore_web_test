function MyAppTable(params) {
	var intParams = params;

	var table;

	function setTable(table_) {
		table = table_;
	}
	
	 this.getBaseUrl=function(){
		return intParams.baseUrl;
	}

	function getTable() {
		return table;
	}

	this.getTableSelectRows = function() {
		var table_ = getTable();
		var getSelectRows = table.bootstrapTable('getSelections',
				function(row) {
					return row;
				});
		return getSelectRows
	}

	this.initTable = function() {

		initTableParams(intParams);

		loadTable(intParams);

	}
	
	this.removeRows=function(rowIds){
		var table =getTable();
		table.bootstrapTable('remove', {field: 'id', values: rowIds});
	}
	this.instRow=function(data){
		var table =getTable();
		table.bootstrapTable('prepend', data);
	}
	this.updateRow=function(data){
		var table =getTable();
		table.bootstrapTable('updateByUniqueId', data);
	}

	// 初始化Table
	function loadTable() {
		var table = $('#' + intParams.tableId).bootstrapTable(
				intParams.tableParams);
		table.on('post-body.bs.table', function(data) {
			$(this).find("input:checkbox").each(
					function(i) {
						var $check = $(this);
						if ($check.attr("id") && $check.next("label")) {
							return;
						}
						$check.next().remove();
						var name = $check.attr("name");
						var id = name + "-" + i;
						var $label = $('<label for="' + id + '"></label>');
						$check.attr("id", id).parent().addClass(
								"checkbox-custom").append($label);
					});
		});
		table.initPageSize = intParams.tableParams.pageSize;

		setTable(table);

	}

	function queryParams(params) {
		return {
			'commSearchBean.pageSize' : params.pageSize,
			'commSearchBean.pageNum' : params.pageNumber,

		};
	}

	function initTableParams(intParams) {
		intParams.tableParams.method = 'POST';
		intParams.tableParams.url = intParams.baseUrl + "list";
		intParams.tableParams.contentType = "application/x-www-form-urlencoded";
		intParams.tableParams.classes = 'table table-bordered table-hover table-striped'; // 表格显示条纹
		intParams.tableParams.showRefresh = true; // 表格显示条纹
		intParams.tableParams.authload = (typeof (intParams.tableParams.authload) == 'undefined') ? true
				: intParams.tableParams.authload;
		intParams.tableParams.pagination = true; // 启动分页
		intParams.tableParams.pageSize = 5; // 每页显示的记录数
		intParams.tableParams.pageNumber = 1; // 当前第几页
		intParams.tableParams.pageList = [ 5, 10 ]; // 记录数可选列表
		intParams.tableParams.uniqueId = (typeof (intParams.tableParams.uniqueId) == 'undefined') ? "id"
				: intParams.tableParams.uniqueId;
		intParams.tableParams.showColumns = true; // 显示下拉框勾选要显示的列
		intParams.tableParams.showToggle = false; // 显示 切换试图（table/card）按钮
		intParams.tableParams.clickToSelect = false; // 点击可选
		intParams.tableParams.singleSelect = false; // 禁止多选
		intParams.tableParams.maintainSelected = true; // 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
		intParams.tableParams.sortable = true; // 禁止所有列的排序
		intParams.tableParams.sidePagination = "server"; // 表示服务端请求 后台分页
		intParams.tableParams.totalField = 'total';
		intParams.tableParams.dataField = 'records';
		intParams.tableParams.fixedColumns = true;
		intParams.tableParams.fixedNumber = 2;
		intParams.tableParams.queryParamsType = '';
		intParams.tableParams.queryParams = queryParams;

		intParams.tableParams.responseHandler = function(res) {
			// console.log("table Event -> 60 ");
			// var tableEvent = getTableEvent();
			// if( typeof(tableEvent) !='undefined' &&
			// typeof(tableEvent)=='function')tableEvent(res);

			if (res.success === false) {
				return {
					selectPage : {
						total : 0,
						rows : []
					}
				}
			} else {
				// res.selectPage.total=10000;
				return res.selectPage;
			}
		}

	}

}
