
	var regnewBonusObj = new PageController({
	   'name': 'regnewBonus',
	   'tpl' : 'template/activity/regnewBonus.html'
    }); 

	regnewBonusObj.createDomObj = function () {
	    this.backBtn = $('#regnewBonus_backbtn');
	    this.shareObj = $('#regnewBonus_shareObj');
	}

	regnewBonusObj.createEvent = function(){
		
		$('#regnewBonus_act').unbind('tap').tap(function(e){
    		regnewBonusObj.getReg();
    	})
		
		$('#regnewBonus_backbtn').tap(function () {
	        regnewBonusObj.goBack();
	    })
	
	    $('#regnewBonus_shareObj').tap( function () {
	        regnewBonusObj.share();
	    });
	}
	
	regnewBonusObj.share = function () {
	    Global.socialShare({
	        'domId': 'regnewBonus',
	        'title': '新人礼688元红包免费领',
	        'content': '上天天中彩，领新人红包，中百万大奖，享美好人生',
	        'url': "",
	        'imagePath': ""
	    });
	};
	
	regnewBonusObj.getReg = function(){
		if (!loginObj.isLogin) {
	        // 用户未登录，先跳到注册页面
	        $.alertMsg('请注册后领取红包');
	        setTimeout(function(){
	        	registerObj.goBack = function () {
		            userCenterObj.show();
		        };
		        registerObj.show();
	        },2000);
	        return;
	    }
	//  //console.log(loginObj.userInfo.mobile)
	    if(loginObj.userInfo.mobile == ""){
	    	$.alertMsg('请绑定手机后领取红包');
	    	setTimeout(function(){
	    		bindPhoneObj.goBack = function () {
		            userCenterObj.show();
		        };
		    	bindPhoneObj.show();
	    	},2000)
	    	return;
	    }
		
		var postData = {
			'access_token': loginObj.access_token
		};
		$.ajax({
        url: ConfigObj.localSite + '?m=user.activity.activityInfo',
        data: postData,
        type: "post",
        dataType: "json",
        success: function (data) {
                // regsendBonusObj.getSucc();
                $.alertMsg(data.code_str, true);
                setTimeout(function () {
                   Global.GC();
                   homeObj.show();
                }, 2000);
               
            
        }
    });
	}


	regnewBonusObj.onloadExecution = function(){
		this.createEvent();
		this.createDomObj();
	}

	regnewBonusObj.init = function(){
		regnewBonusObj.onloadExecution();
	}
	
  

