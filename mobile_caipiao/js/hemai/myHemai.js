
	var myHemaiObj = new PageController({
	   'name': 'myHemai',
	   'tpl' : 'template/hemai/myHemai.html'
    }); 

	myHemaiObj.createDomObj = function(){
		this.wrapObj = $("#myHemai_wrapObj");
		this.buyObj = $("#myHemai_buyObj");
		this.overNumObj = $("#myHemai_overNumObj");
		this.overInputObj = $("#myHemai_moneyObj");
		this.copObj = $("#myHemai_copObj");
//		this.lotteryObj = $("hemaiIndex_lotteryObj");
//		this.tipsObj = $("#modifyUserName_tipsObj");
//		this.usernameObj = $("#modifyUserName_usernameObj");
//		this.backObj = $("#modifyUserName_backObj");
//		this.userLiObj = $("#modifyUserName_userLiObj");
//		this.nowName = $('#modifyUserName_nowName');
	}

	myHemaiObj.createEvent = function(){

		this.wrapObj.unbind('tap').tap(function(e){
			myHemaiObj.updateMoneyEvent(e);
		});
		
	}

	myHemaiObj.updateMoneyEvent = function(e){
//		var liObj = $.oto_checkEvent(e,"A");
//		if(liObj){
//			var thisObj = $(liObj);
//			var thisT = thisObj.attr("data-t");
//			switch(thisT){
//				case "planBtn" : this.planBtn(thisObj);return true;
//			}
//		}
		
		var aObj = $.oto_checkEvent(e,"A");
		if(aObj){
			var thisObj = $(aObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "xy" : this.goHemaixy();return true;
			}
		}
		
		var dObj = $.oto_checkEvent(e,"DL");
		if(dObj){
			var thisObj = $(dObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "godetail" : this.goDetail(thisObj);return true;
			}
		}
		
		
		var sObj = $.oto_checkEvent(e,"SPAN");
		if(sObj){
			var thisObj = $(sObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "moreList" : this.moreList(thisObj);return true;
				case "gobuy" : this.gobuy(thisObj);return true;
				case "reduce" : this.reduceNum();return true;
				case "per" : this.showOverNum();return true;
				case "increase" : this.addNum();return true;
				case "od"  : this.delOverVal();break;
        		case "os"  : this.hideOverTips();break;
        		case "on"  : this.updateOverVal(thisObj);break;
        		case "attention" : this.myAttention();break;
			}
		}
		
		var pObj = $.oto_checkEvent(e,"P");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			switch(thisT){
				case "backbtn" : this.goBack();return true;
				case "buyAll" : this.buyAll();return true;
				case "submit" : this.goPay();return true;
			}
		}
	}

	myHemaiObj.goDetail = function(obj){
		var thisV = obj.attr('data-v');
		hemaiDetailObj.goBack = function(){
			 hemaiDetailObj.destroy();
			 myHemaiObj.show();
		 }
		hemaiDetailObj.show(true,function(){
			hemaiDetailObj.setData(thisV);
		});
	}

	myHemaiObj.myAttention = function(){
		myAttentionObj.goBack = function(){
			 myAttentionObj.destroy();
			 myHemaiObj.show();
		 }
		myAttentionObj.show();
	}

	myHemaiObj.gobuy = function(obj){
		var parent = $('#myHemai');
		var buyWrap = parent.find('#myHemai_buyObj');
		//console.log(buyWrap)
		if (buyWrap.length > 0) {
            if (buyWrap.css('display') == 'none') {
                addBgLayer();
                buyWrap.show();
            } else {
                $('#myHemai_buyObj').hide();
                $('#buy_bgLayer').remove();
            }
        } 
		
		function addBgLayer() {
            var bg = '<div style="width:100%;height:100%;background:transparent;position:fixed;left:0;top:0;z-index:90" id="buy_bgLayer"></div>';
//          //console.log($('#global_bgLayer').length)
            if ($('#buy_bgLayer').length == 0) {
                parent.append(bg);
                $('#buy_bgLayer').css({ 'height': document.documentElement.scrollHeight || document.body.scrollHeight })
                $('#buy_bgLayer').unbind('tap').tap(function() {
                    $('#myHemai_buyObj').hide();
                    $('#buy_bgLayer').remove();
                })
            }
        }
		
		this.lotteryType = obj.attr('data-k');
		this.lotteryNo = obj.attr('data-n');
		this.productId = obj.attr('data-v');
		this.allNum = obj.attr('data-b');
		this.overNum = 1;
		this.copObj.html(this.overNum+"份");
		this.overInputObj.html(this.overNum);
		
	}

	myHemaiObj.reduceNum = function(){
		if(this.overNum > 1){
			this.overNum = this.overNum - 1;
			this.overInputObj.html(this.overNum);
    		this.copObj.html(this.overNum+"份");
		}
	}
	
	myHemaiObj.addNum = function(){
		this.overNum = this.overNum + 1;
		this.overInputObj.html(this.overNum);
		this.copObj.html(this.overNum+"份");
	}	
	
	myHemaiObj.showOverNum = function(){
		this.overNumObj.show();
		this.checkTipsShow = true;
	}
	
	
	myHemaiObj.updateOverVal = function(obj){
    if(this.checkTipsShow){
      this.overNum = 0;
      this.checkTipsShow = false;
    }
    var thisV = obj.attr("data-v");
    this.overNum = Number(this.overNum+""+thisV);
    if(this.overNum>this.maxOver)this.overNum = this.maxOver;
    this.overInputObj.html(this.overNum);
    this.copObj.html(this.overNum+"份");
  }
	
  myHemaiObj.delOverVal = function(){
    this.overNum = Number((this.overNum+"").slice(0,-1));
    this.overInputObj.html(this.overNum);
     this.copObj.html(this.overNum+"份");
  }

  myHemaiObj.hideOverTips = function(){
    if(this.overNum<1)this.overNum=1;
    this.overInputObj.html(this.overNum);
    this.copObj.html(this.overNum+"份");
    this.overNumObj.hide();
    this.checkTipsShow = false;
    this.overInputObj.removeClass('fontblue');
  }
	
	myHemaiObj.goHemaixy = function(){
		 hemaixyObj.goBack = function(){
			 hemaixyObj.destroy();
			 myHemaiObj.show();
		 }
		 hemaixyObj.show();
	}

	myHemaiObj.moreList = function(obj){
		var thisV = obj.attr("data-v");
//		//console.log(thisV)
		var user_id = loginObj.userId;
		hemaiListObj.goBack = function(){
			 hemaiListObj.destroy();
			 myHemaiObj.show();
		 }
		hemaiListObj.show(true,function(){
			
			hemaiListObj.setData({
				'status':thisV,
				'user_id':user_id
			});
		});
	}

	myHemaiObj.buyAll = function(){
		this.overNum = this.allNum;
		this.overInputObj.html(this.overNum);
    	this.copObj.html(this.overNum+"份");
	}
	
	myHemaiObj.goPay = function(){
		var data = {
			'lotteryType': this.lotteryType.toUpperCase(), 
			'lotteryNo' : this.lotteryNo, 
			'product_id' : this.productId,
			'product_type': this.productType,
			'pay_amount': this.overNum,
			'assure_amount': -1
		}
		////console.log(postData)
		buyConfirmObj.goBack=function(){
  			buyConfirmObj.destroy();
  			myHemaiObj.show();
  		};
  		setTimeout(function(){
            buyConfirmObj.show(true, function () {
                buyConfirmObj.setData(data);
            });
		},300)   //防止未登录流程多页面连续切换，由动画延迟导致的切换问题 zhangw
	}


	myHemaiObj.getData = function(){
		
        var postData = {
			'user_id':loginObj.userId
		}
        var secretData = {
        	'para':Global.encrypt(postData),
        	'access_token':loginObj.access_token
        }
          //console.log(postData)
		$.ajax({
			url : ConfigObj.localSite +  '?m=lottery.lottery.TogetherUserInfo',
			data : secretData,
			type : "post",
			dataType : "json",
			success : function(msg){
//				console.log(msg);
				if(msg.code == '0000'){
					myHemaiObj.formatHtmlA(msg.info);
					myHemaiObj.formatHtmlB(msg.info.project_info.launch);
					myHemaiObj.formatHtmlC(msg.info.project_info.follow);
				}else{
					
				}
				
			}

		});
	}

	myHemaiObj.formatHtmlA = function(obj){
		var data = obj;
		$('#myHemai_name').html(data.user_name);
		$('#myHemai_follow').html(data.follow_num);
		$('#myHemai_fans').html(data.fans_num);
		$('#myHemai_buyMoney').html(data.project_total_money);
		$('#myHemai_prizeMoney').html(data.prize_total_money);
	}

	myHemaiObj.formatHtmlB = function(obj){
		if(obj.length == 0){
			var html = [];
			html.push('<div class="hemaiIndex_option option_white"><p>暂无合买信息！</p></div>');
			$('#myHemai_recomRecord').html(html.join(""));
			$('#myHemai_onlist').hide();
			return false;
		}
		
		var data = obj;
		function sort(obj){
			var arr = [];
			var lastarr = [];
			for (var i=0;i<obj.length;i++) {
				if(typeof(obj[i].goods_status) == "object"){
					sort(obj[i]);
				}else if (obj[i].goods_status == "on") {
					arr.push(obj[i]);
				} else{
					lastarr.push(obj[i]);
				}
			}
			var arr = arr.concat(lastarr);
			return arr;
		}
		var listData = sort(data);
		
		
		var html = ''; 
		for (var i=0,ilen=listData.length;i<ilen;i++) {
			var itm = listData[i];
			if (itm.goods_status == "on") {
				html += '<div class="myRecord_list">'+
						'<div class="myRecord_list_t clearfix">'+
							'<div class="content1">'+
								'<p style="font-size:12px;">'+itm.lottery_type_cn+'</p>'+
							'</div>'+
							'<div class="content5">'+
								'<p>'+itm.sell_end_time+'截止</p>'+
							'</div>'+
							'<div class="content2 myRecord_btn">'+
								'<span data-t="gobuy" data-v="'+itm.lottery_id+'" data-k="'+itm.lottery_type+'" data-n="'+itm.lottery_no+'" data-b="'+itm.completeNum+'">立即跟单</span>'+
							'</div>'+
						'</div>'+
						'<dl class="hm_list_b" data-t="godetail" data-v="'+itm.lottery_id+'">'+
							'<div class="content3 hmPace" style="text-align: center;">'+
								'<canvas id="b'+itm.lottery_id+'" class="hm_scale" width="120px" height="120px" style="width: 60px;height: 60px;"></canvas>'+
								'<div class="hm_pace">'+
									'<p>'+itm.completerate+'%</p>'+
									'<span>保'+itm.assure_rate+'%</span>'+
								'</div>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>总金额</p>'+
								'<span>'+itm.money+'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>参与人数</p>'+
								'<span>'+itm.share_user_num+'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>剩余份数</p>'+
								'<span>'+itm.completeNum+'</span>'+
							'</div>'+
							'<div class="content4 hmIndex_arr"></div>'+
						'</dl>'+
					'</div>';
			}else{
				html += '<dl class="myRecord_list clearfix" data-t="godetail" data-v="'+itm.lottery_id+'">'+
						'<div class="content3 hm_info">'+
							'<p>彩种</p>'+
							'<span>'+itm.lottery_type_cn+'</span>'+
						'</div>'+
						'<div class="content3 hm_info">'+
							'<p>总金额</p>'+
							'<span>'+itm.money+'</span>'+
						'</div>'+
						'<div class="content3 hm_info">'+
							'<p>参与人数</p>'+
							'<span>'+itm.share_user_num+'</span>'+
						'</div>'+
						'<div class="content3 hm_info" id="myHemai_project'+itm.lottery_id+'">'+
						'</div>'+
						'<div class="content4 hmIndex_arr"></div>'+
					'</dl>';
			}
		};
		$('#myHemai_recomRecord').html(html);
		
		for (var a=0,ilen=listData.length;a<ilen;a++) {
			var itm = listData[a];
			var Html = '';
			if(itm.goods_status == "cancel"){
				Html+='<div class="hemai_result">已撤单</div>';
			}else if(itm.goods_status == "fail"){
				Html+='<div class="hemai_result">已流单</div>';
			}else if(itm.goods_status == "deal"){
				if(itm.print_status == "yes"){
					Html+='<div class="hemai_result result_y">待开奖</div>';
				}else if(itm.print_status == "not"){
					Html+='<div class="hemai_result">待出票</div>';
				}else{
					Html+='<div class="hemai_result">出票中</div>';
				}
			}else if(itm.goods_status == "end"){
				if (itm.prize_status == "Prize") {
					if (itm.net_prize > 0) {
						Html+='<div class="hemai_result result_y">已中奖</div>';
					} else{
						Html+='<div class="hemai_result">未中奖</div>';
					}
				} else if(itm.prize_status == "Not"){
					Html+='<div class="hemai_result result_y">待开奖</div>';
				} else{
					Html+='<div class="hemai_result result_y">待派奖</div>';
				}
			}
			$('#myHemai_project'+itm.lottery_id+'').html(Html);
		};
		
		for (var k=0,ilen=listData.length;k<ilen;k++) {
			if(listData[k].goods_status == "on"){
				var canvasId = "b"+listData[k].lottery_id;
				drawCircle({
				    id: canvasId,
				    color: '#e04241',
				    angle: listData[k].completerate/100,
				    lineWidth: 4
				});
			}
		};
	}

	myHemaiObj.formatHtmlC = function(obj){
		if(obj.length == 0){
			var html = [];
			html.push('<div class="hemaiIndex_option option_white"><p>暂无合买信息！</p></div>');
			$('#myHemai_recentRecord').html(html.join(""));
			$('#myHemai_endlist').hide();
			return false;
		}
		
		var data = obj;
		function sort(obj){
			var arr = [];
			var lastarr = [];
			for (var i=0;i<obj.length;i++) {
				if(typeof(obj[i].goods_status) == "object"){
					sort(obj[i]);
				}else if (obj[i].goods_status == "on") {
					arr.push(obj[i]);
				} else{
					lastarr.push(obj[i]);
				}
			}
			var arr = arr.concat(lastarr);
			return arr;
		}
		var listData = sort(data);
		
		
		var html = ''; 
		for (var i=0,ilen=listData.length;i<ilen;i++) {
			var itm = listData[i];
			if (itm.goods_status == "on") {
				html += '<div class="myRecord_list">'+
						'<div class="myRecord_list_t clearfix">'+
							'<div class="content1">'+
								'<p style="font-size:12px;">'+itm.lottery_type_cn+'</p>'+
							'</div>'+
							'<div class="content5">'+
								'<p>'+itm.sell_end_time+'截止</p>'+
							'</div>'+
							'<div class="content2 myRecord_btn">'+
								'<span data-t="gobuy" data-v="'+itm.lottery_id+'" data-k="'+itm.lottery_type+'" data-n="'+itm.lottery_no+'" data-b="'+itm.completeNum+'">立即跟单</span>'+
							'</div>'+
						'</div>'+
						'<dl class="hm_list_b" data-t="godetail" data-v="'+itm.lottery_id+'">'+
							'<div class="content3 hmPace" style="text-align: center;">'+
								'<canvas id="c'+itm.lottery_id+'" class="hm_scale" width="120px" height="120px" style="width: 60px;height: 60px;"></canvas>'+
								'<div class="hm_pace">'+
									'<p>'+itm.completerate+'%</p>'+
									'<span>保'+itm.assure_rate+'%</span>'+
								'</div>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>总金额</p>'+
								'<span>'+itm.money+'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>参与人数</p>'+
								'<span>'+itm.share_user_num+'</span>'+
							'</div>'+
							'<div class="content3 hm_info">'+
								'<p>剩余份数</p>'+
								'<span>'+itm.completeNum+'</span>'+
							'</div>'+
							'<div class="content4 hmIndex_arr"></div>'+
						'</dl>'+
					'</div>';
			} else{
				html += '<dl class="myRecord_list clearfix" data-t="godetail" data-v="'+itm.lottery_id+'">'+
						'<div class="content3 hm_info">'+
							'<p>彩种</p>'+
							'<span>'+itm.lottery_type_cn+'</span>'+
						'</div>'+
						'<div class="content3 hm_info">'+
							'<p>总金额</p>'+
							'<span>'+itm.money+'</span>'+
						'</div>'+
						'<div class="content3 hm_info">'+
							'<p>参与人数</p>'+
							'<span>'+itm.share_user_num+'</span>'+
						'</div>'+
						'<div class="content3 hm_info" id="myHemai_project'+itm.lottery_id+'">'+
//							'<div class="hemai_result '+(itm.net_prize > 0 ? 'result_y':'')+'">'+(itm.net_prize > 0 ? '已中奖':'未中奖')+'</div>'+
						'</div>'+
						'<div class="content4 hmIndex_arr"></div>'+
					'</dl>';
			}
		};
		$('#myHemai_recentRecord').html(html);
		
		for (var a=0,ilen=listData.length;a<ilen;a++) {
			var itm = listData[a];
			var Html = '';
			if(itm.goods_status == "cancel"){
				Html+='<div class="hemai_result">已撤单</div>';
			}else if(itm.goods_status == "fail"){
				Html+='<div class="hemai_result">已流单</div>';
			}else if(itm.goods_status == "deal"){
				if(itm.print_status == "yes"){
					Html+='<div class="hemai_result result_y">待开奖</div>';
				}else if(itm.print_status == "not"){
					Html+='<div class="hemai_result">待出票</div>';
				}else{
					Html+='<div class="hemai_result">出票中</div>';
				}
			}else if(itm.goods_status == "end"){
				if (itm.prize_status == "Prize") {
					if (itm.net_prize > 0) {
						Html+='<div class="hemai_result result_y">已中奖</div>';
					} else{
						Html+='<div class="hemai_result">未中奖</div>';
					}
				} else if(itm.prize_status == "Not"){
					Html+='<div class="hemai_result result_y">待开奖</div>';
				} else{
					Html+='<div class="hemai_result result_y">待派奖</div>';
				}
			}
			$('#myHemai_project'+itm.lottery_id+'').html(Html);
		};
		
		for (var k=0,ilen=listData.length;k<ilen;k++) {
			if(listData[k].goods_status == "on"){
				var canvasId = "c"+listData[k].lottery_id;
				drawCircle({
				    id: canvasId,
				    color: '#e04241',
				    angle: listData[k].completerate/100,
				    lineWidth: 4
				});
			}
		};
	}



	myHemaiObj.onloadExecution = function(){
		this.createDomObj();
		this.createEvent();
		this.getData();
	}

	myHemaiObj.setDefConfig = function(){
		this.overNum = 1;
		this.allNum = '';
		this.id = '';
		this.productId = '';
		this.lotteryNo = '';
		this.lotteryType = '';
		this.productType = '';
	}

	myHemaiObj.init = function(){
		myHemaiObj.onloadExecution();
		myHemaiObj.setDefConfig();
	}
	
	