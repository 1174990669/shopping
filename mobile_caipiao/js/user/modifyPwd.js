
	var modifyPwdObj = new PageController({
	   'name': 'modifyPwd',
	   'tpl' : 'template/user/modifyPwd.html'
    }); 

	modifyPwdObj.createDomObj = function(){
		this.oldPwdObj = $("#modifyPwd_oldPwdObj");
		this.newPwdObj = $("#modifyPwd_newPwdObj");
		this.resnewPwdObj = $("#modifyPwd_resnewPwdObj");
		this.submitObj = $("#modifyPwd_submitObj");
		this.backObj = $("#modifyPwd_backObj");
	}

	modifyPwdObj.createEvent = function(){
		this.oldPwdObj.add(this.newPwdObj).add(this.resnewPwdObj).unbind('focus').focus(function(){
			$(this).parent().addClass('focus');
		});
		this.oldPwdObj.add(this.newPwdObj).add(this.resnewPwdObj).unbind('blur').blur(function(){
			$(this).parent().removeClass('focus');
		});

		this.submitObj.unbind('tap').tap(function(){
			modifyPwdObj.submitPwd();
		});

		this.backObj.unbind('tap').tap(function(){
			modifyPwdObj.goBack();
		});
	}

	modifyPwdObj.submitPwd = function(){
		var oldPwdVal = this.oldPwdObj.val();
		var newPwdVal = this.newPwdObj.val();
		var resnewPwdVal = this.resnewPwdObj.val();

		if(oldPwdVal===""){
			$.alertMsg("旧密码不能为空");
			return false;
		}else if(oldPwdVal.length<6){
			$.alertMsg("旧密码长度最少为6位");
			return false;
		}else if(oldPwdVal.length>16){
			$.alertMsg("旧密码长度最大为16位");
			return false;
		}else if(newPwdVal===""){
			$.alertMsg("新密码不能为空");
			return false;
		}else if(newPwdVal.length<6){
			$.alertMsg("新密码长度最少为6位");
			return false;
		}else if(newPwdVal.length>16){
			$.alertMsg("新密码长度最大为16位");
			return false;
		}else if(resnewPwdVal===""){
			$.alertMsg("确认密码不能为空");
			return false;
		}else if(resnewPwdVal.length<6){
			$.alertMsg("确认密码长度最少为6位");
			return false;
		}else if(resnewPwdVal.length>16){
			$.alertMsg("确认密码长度最大为16位");
			return false;
		}else if(newPwdVal!==resnewPwdVal){
			$.alertMsg("新密码和确认密码不一致");
			return false;
		}
		var reg = /^[0-9a-zA-Z]*$/g;
		if(!reg.test(newPwdVal)){
			$.alertMsg("密码只能为数字或字母");
			return false;
		}
		
		var postData = {
			'para':Global.encrypt(
				{
				'oldPassWord': hex_md5(oldPwdVal),
				'newPassWord' : hex_md5(newPwdVal),	
				}
				),
			'access_token': loginObj.access_token
		}

		$.ajax({
			//url : "/account/modifypwd",
			url : ConfigObj.localSite +  '?m=user.account.modifypwd',
			dataType : "json",
			type : "post",
			data : postData,
			success : function(msg){
				if(Number(msg.code)===0){
					$.alertMsg("修改成功",true);
					setTimeout(function(){
						//window.location.href = "/account/login";
						loginObj.goBack=function(){
							//Global.GC();
							//userCenterObj.show();
						}
						loginObj.goForward = function(){
							Global.GC();
							userCenterObj.show();	
						}
						loginObj.show();
						
					},2000);
					
				}else{
					$.alertMsg(msg.code_str);
				}
			}
		});
	}

	
	modifyPwdObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
	}

	modifyPwdObj.init = function(){
		modifyPwdObj.onloadExecution();
	}
	
