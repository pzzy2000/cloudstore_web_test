function login(){
	
	ajaxForm($('#login'),{
		url:ajaxurl('/sys/manager/platform/login'),
		success:function(data){
			if(data.result.code ==-1){
				$('#msg').html(data.result.msg);
			}else{
				window.localStorage.setItem('auth',data.result.result);
				tourl("/manager/main.html");
			}
		},
		error:function(data){
			$('#msg').html("登录失败[系统错误]");
		}
	});
}