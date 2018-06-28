
  //首页js
  var homeObj = new PageController({
	   'name': 'home',
	   'tpl' : 'template/home.html'
  });


  //banner比例
  homeObj.defBannerImgProportion = 640/280;

  // 默认彩种数据，已删除，liuchao
  homeObj.defLotteryData = [];

  //彩种权重数据
  homeObj.lotterySortData = window.localStorage.getItem("homeObj_lotteryStor_data");
  homeObj.lotterySortData = homeObj.lotterySortData ? $.parseJSON(homeObj.lotterySortData) : {};


  //ajax返回数据
  homeObj.ajaxData = new Object();

  
  //自动生成banner高度
  homeObj.createBannerHeight = function(){
    var bodyWidth = $("body").width();
    var height= bodyWidth/this.defBannerImgProportion ;
    this.bannerImgObj.css("height",height+"px");
    this.bannerDivObj.css("height",height+"px")
  }

  //生成banner
  homeObj.createBanner = function () {
      var data = this.ajaxData.banner;
      if (!data.length) return;
      var imgHtml = [];
      var navHtml = [];

      data.forEach(function (v, i) {
          var url = v['url'];
          if ('news' === url) url += '?newsId=' + v['newsId'];
          if ('/activity/regsend' === url) url += '?id=' + v['id'];
          if ('lotteryRules' === url) url += '?lotteryType=' + v['lotteryType'];
          imgHtml.push('<li data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><a><img src="' + v['imgurl'] + '"></a></li>');
          navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
      });
      	// imgHtml.push('<li data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><a><img src="' + v['imgurl'] + '"></a></li>');
        // navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
      // console.log( '46轮播图' + imgHtml )
      // console.log( '47轮播图' + navHtml )
      this.bannerImgObj.html(imgHtml.join(''));
      var narWrapObj = $('#home_bannerNavWarpObj').html(navHtml.join(''));
      this.bannerNavObj = narWrapObj.children('a');

      this.bannerSwipeSlide();
      delete this.ajaxData.banner;
  }

  //banner轮播
  homeObj.bannerSwipeSlide = function () {
      this.bannerDivObj.swipeSlide({
          continuousScroll: true,
          speed: 3000,
          lazyLoad: true,
          callback : function(i){
	        homeObj.bannerNavObj.removeClass('on');
	        homeObj.bannerNavObj.eq(i).addClass('on');
	      }
      });
  }
// console.log(100)
  //生成彩种dom
  homeObj.createLottery = function(){
    var data = homeObj.ajaxData.lottery;
//  //console.log(data);
    var html = [];
    for(var i=0;i<data.length;i++){ 
    	var adId = data[i].add
        var thisLottery = data[i].enName;
      if (homeObj.ajaxData.lotteryAddPrize == undefined) {
      		// data[i].add = false; 	
      		data[i].add = adId; 	
      }
        var htmlStr = '<li data-t="lottery" data-v="' + thisLottery + '"><a href="javascript:void(0)"><span class="lot_icon ' + thisLottery + '01 fl"></span><div class="lot_name fl"><h3>' + data[i]['cnName'] + '</h3>' + ((data[i]['bonus'] && data[i]['bonusVal'] != '-1元') ? '<p>奖池：<span class="money">' + data[i]['bonusVal'] + ' </span></p>' : '<p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + data[i]['msg'] + '</p>') + (data[i]['add'] ? '<span class="acticon a-jiaj"></span>' : '') + '</div>' + (data[i]['open'] ? '<span class="acticon a-kaij"></span>' : '') + '</a></li>';
      if(data[i]['first']){
        html.unshift(htmlStr);
      }else{
        html.push(htmlStr);
      }
    }
	this.lotteryUlObj.html(html.join(""));
	// console.log( "85"+ htmlStr)
  }
  
  homeObj.newsEvent = function(e){
    var dlObj = $.oto_checkEvent(e,"DL");
    if(dlObj){
      var thisObj = $(dlObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "detail" : this.goNewsDetail(thisObj.attr('data-id'));return true;
      }
      return false;
    }
  }

  homeObj.navEvent = function(e){
    var aObj = $.oto_checkEvent(e,"A");
    if(aObj){
      var thisObj = $(aObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "my" : this.goUserCenter();return true;
        case "kaijiang" : this.goKaijiang();return true;
				case "discover" : this.goDiscover();return true;
				case "newuser" : this.goNewUser();return true;
      }
      return false;
    }
  }
  
  //foot点击分发
  homeObj.footEvent = function(e){
    var dlObj = $.oto_checkEvent(e,"DL");
    if(dlObj){
      var thisObj = $(dlObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
       // case "js" : $.alertMsg('正在建设中');return true;
		//case 'news' : homeObj.goNews();return true;
       // case "localSite" : homeObj.goLocalSite();return true;
		case 'scorePrize' : homeObj.goScorePrize();;return true;
		case 'chart' : homeObj.goChart();return true;
		//case 'activityIdx': homeObj.goActivityIdx();return true;
      }
    }
  }
  
  
  
  homeObj.goNewsDetail = function(id){
	  newsDetailObj.goBack = function(){
		 newsDetailObj.destroy();
		 homeObj.show();  
	  }
	  newsDetailObj.show('',function(){
		 newsDetailObj.getData(id);  
	  })
  }
  
  homeObj.goActivityIdx = function(){
	   activityIdxObj.goBack = function(){
		  activityIdxObj.destroy();
		  homeObj.show();   
	   }
	   activityIdxObj.show('',function(){
		   activityIdxObj.getData();   
	   });
  }
  
  homeObj.goScorePrize = function(){
	 scorePrizeObj.goBack = function(){
		 scorePrizeObj.destroy();
		 homeObj.show(); 
	 }
	 scorePrizeObj.show('',function(){
		 scorePrizeObj.getData(-1);   //默认是1 
	 })
  }
  
  
  
  //跳转到附近站点
  homeObj.goLocalSite= function(){
	/* localSiteObj.pushRoute(function(){  //路由机制
		homeObj.show();
	 }) */
	 localSiteObj.goBack=function(){
		localSiteObj.destroy();
		homeObj.show(); 
	 }
	 localSiteObj.show();
  }
  
  //跳转到用户中心页面
  homeObj.goUserCenter=function(){
	 if(loginObj.isLogin){
		userCenterObj.goBack = function(){
			userCenterObj.destroy();
			homeObj.show();	
		}
		userCenterObj.show('reload');
	 }else{
		 loginObj.goForward = function(){
			userCenterObj.show('reload'); 
			userCenterObj.goBack=function(){
				userCenterObj.destroy();
				homeObj.show();	
			}
		 }
		 loginObj.goBack = function(){
			homeObj.show(); 
		 }
		 loginObj.show();
	 }
  }
  
  //跳转到开奖
  homeObj.goKaijiang = function(){
	  numKaijiangObj.goBack=function(){
		numKaijiangObj.destroy();
		homeObj.show(); 
	  }
	  numKaijiangObj.show();
  }
  
  //跳转到新手
  homeObj.goNewUser = function(){
	 settingObj.goBack = function(){
		settingObj.destroy();
		homeObj.show(); 
	 }
	 settingObj.show();
  }
  
  homeObj.goDiscover = function(){
	  discoverObj.goBack = function(){
		 discoverObj.destroy();
		 homeObj.show();  
	  }
	  discoverObj.show();
  }

  /**
   * banner 触摸事件处理
   * @param {Event} e
   * @returns {boolean}
   */
  homeObj.bannerEvent = function (e) {
      var LiObj = $.oto_checkEvent(e, "LI");
      if (LiObj) {
          var thisObj = $(LiObj);
          var v = thisObj.attr('data-v');
          var parseSimpleUrl = function (url) {
//            //console.log(url);
              var tmp = url.split('?');

              var path = tmp[0];
              var args = {};

              if (tmp[1] && tmp[1].length) {
                  var tmp2 = tmp[1].split('&');
                  tmp2.forEach(function (v) {
                      var tmp3 = v.split('=');
                      args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
                  })
              }

              return {path: path, args: args};
          };

          if (v.indexOf('http://') == 0 || v.indexOf('https://') == 0) {
              // 外部链接
			  Global.openUrl(v);
          } else {
              var ret = parseSimpleUrl(v);
//							//console.log(ret);
							if(ConfigObj.display){
	              if (ret.path == '/jczq') this.gotoJczqBet();
	              else if (ret.path == '/dlt') this.gotoDltBet();
	              else if (ret.path == '/ssq') this.gotoSsqBet();
	              else if (ret.path == '/jxk3') this.goFastK3Bet('jxk3');
	              else if (ret.path == '/d3') this.gotoD3Bet();
	              else if (ret.path == '/pl3') this.gotoPl3Bet();
	              else if (ret.path == '/pl5') this.gotoPl5Bet();
	              else if (ret.path == '/jc2x1') this.goto2x1Bet();
	              else if (ret.path == '/spf14') this.goTotoBet();
	              else if (ret.path == '/spf9') this.goR9Bet();
	              else if (ret.path == 'helpDetail') {
	                  helpDetailObj.goBack = function () {
	                      helpDetailObj.destroy();
	                      homeObj.show();
	                  };
	                  helpDetailObj.show('reload', function () {
	                      helpDetailObj.setData(ret.args.type);
	                  });
	              }
	              else if (ret.path == 'lotteryRules') {
	                  lotteryRulesObj.goBack = function () {
	                      lotteryRulesObj.destroy();
	                      homeObj.show();
	                  };
	                  lotteryRulesObj.show('reload', function () {
	                      lotteryRulesObj.setData(ret.args.lotteryType, 'prize');
	                  })
	              }
	              else if (ret.path == '/activity/regsend') {
	                  // 注册送活动
	                  regsendBonusObj.goBack = function () {
	                      regsendBonusObj.destroy();
	                      homeObj.show();
	                  };
	                  regsendBonusObj.show('', function () {
	                      regsendBonusObj.getData(ret.args.id);
	                  });
	              }
	              else if (ret.path == '/activity/regnewBonus') {
	                  // 注册送活动
	                  regnewBonusObj.goBack = function() {
						            regnewBonusObj.destroy();
						            homeObj.show();
						        }
						        regnewBonusObj.show();
	              }
	              else if (ret.path == '/activity/invsend') {
	                  Global.bgColor = window.getComputedStyle(document.body).backgroundColor;
	                  invsendBonusObj.goBack = function () {
	                      document.body.style.backgroundColor = Global.bgColor;
	                      invsendBonusObj.destroy();
	                      homeObj.show();
	                  };
	                  invsendBonusObj.show(true, function () {
	                      document.body.style.backgroundColor = '#f9ddb6';
	                      invsendBonusObj.getData('', ret.args.id);
	                  });
	              }
	              else if (ret.path == 'news') homeObj.goNewsDetail(ret.args.newsId);
	              else Global.open(v);
	              // else this.lotteryHref(thisObj, 'banner');
	          }
					}
          Global.pv('banner', {url: v});
      }
  }
  
  homeObj.goDownload = function(){
	// var str = 'http://files.cailebang.com/download/package/TJLottery.apk';
	// Global.openUrl(str);
  }
  
  homeObj.goRegBonus = function(obj){
	  var id = obj.attr('data-actId');
	  regsendBonusObj.goBack = function(){
		 regsendBonusObj.destroy();
		 homeObj.show();  
	  }
	  regsendBonusObj.show('',function(){
		regsendBonusObj.getData(id);	  
	  });
  }
  
  //彩种点击事件分发
  homeObj.lotteryEvent = function(e){
    var LiObj = $.oto_checkEvent(e,"LI");
    if(LiObj){
      var thisObj = $(LiObj);
      var thisT = thisObj.attr("data-t");
      switch(thisT){
        case "lottery" : this.lotteryHref(thisObj);
      }
      return false;
    }
	
  }

  //彩种权重修改
  homeObj.updateLotterySort = function(lotteryType){
    homeObj.lotterySortData[lotteryType] = homeObj.lotterySortData[lotteryType] ? Number(homeObj.lotterySortData[lotteryType])+1 : 1;
    window.localStorage.setItem("homeObj_lotteryStor_data",$.stringifyJSON(homeObj.lotterySortData));
  }

  //跳转彩种
  homeObj.lotteryHref = function(obj,type){
    
	if(type && type == 'banner'){
		var tempArr = obj.attr('data-v').split('/');
		var lotteryType = tempArr[tempArr.length-1];
		var id = obj.attr('data-id');
		var webUrl = obj.attr('data-webUrl');
	}else{
		var lotteryType = obj.attr("data-v").replace('/','');	
	}
	
	//bcy  判断该彩种是否可售
	var data = homeObj.ajaxData.lottery;
//	//console.log(data);
	for(var i=0;i<data.length;i++){   
      var thisLottery = data[i].enName;
      if (lotteryType != thisLottery)
      	continue;
      	
      if (!data[i]["valid"]){
//    	$.alertMsg("抱歉，该彩种暂不支持销售");  活动
				$.alertMsg('该彩种暂停售票');
				// $.alertMsg('应国家政策法规要求，不提供APP线上购彩');
      	return;
      	
      }
     
    }
    
    
	
    //this.updateLotterySort(lotteryType);
	switch(lotteryType){
		case 'dlt':
			this.gotoDltBet();
			break;
		case 'ssq':
			this.gotoSsqBet();
			break;
		case 'pl3':
			this.gotoPl3Bet();
			break;
		case 'd3':
			this.gotoD3Bet();
			break;
		case 'pl5':
			this.gotoPl5Bet();
			break;	
		case 'qxc':
			this.gotoQxcBet();
			break;
		case 'jczq':
			this.gotoJczqBet();
			break;
		case 'jz2x1':
			this.goto2x1Bet();
			break;
		case 'spf14':
			this.goTotoBet();
			break;
		case 'spf9':
			this.goR9Bet();
			break;
		case 'tjsyy':   //高频
			this.goFastBet('tjsyy');
			break;
		case 'gd11x5':
			this.goFastBet('gd11x5');
			break;
		case 'gx11x5':
			this.goFastBet('gx11x5');
			break;
		case 'tj11x5':   //天津demo
			this.goFastBet('tjsyy');
			break;
    case 'sd11x5':   //天津demo
    	this.goFastBet('sd11x5');
    	break;
		case 'gxk3':   //广西快3
			this.goFastK3Bet('gxk3');
			break;
		case 'jxk3':   //江西快3
			this.goFastK3Bet('jxk3');
			break;
		case 'hn4j1':
			this.goHn4j1Bet();
			break;
		case 'jclq':
			this.goBasketMixBet();
			break;
		case 'news':
			this.goNewsDetail(id);
			break;
		case 'scorePrize':   //抽奖活动
			this.goScorePrize();
			break;
		case 'link':
			Global.openUrl(webUrl);
        default:
        	if (ConfigObj.syx5Type.indexOf(lotteryType)) this.goFastBet(lotteryType); // 11选5 入口
			break;
		
	}
  }
  
  homeObj.goBasketMixBet = function(){
	  basketMixObj.goBack = function(){
		basketMixObj.destroy();
		homeObj.show(); 
	 }
	 basketMixObj.show(true,function(){
		basketMixObj.getData(); 
	 })
  }
  
  homeObj.goHn4j1Bet = function(){
	 hn4j1Obj.goBack = function(){
		hn4j1Obj.destroy();
		hn4j1ConfirmObj.destroy();
		//hn4j1TrendObj.destroy();
		homeObj.show(); 
	 }
	 hn4j1Obj.show(true);
  }
  
  //跳转到快三
  homeObj.goFastK3Bet = function(type){
  	//console.log(type);
	  fastK3Obj.goBack = function(){
		  fastK3Obj.destroy();
		  fastK3ConfirmObj.destroy(); 
		  homeObj.show();
	  }
	  ConfigObj.fastK3Type = type;   //高频类型
	  fastK3Obj.show(true,function(){
		
	  });
  }


  //跳转到十一选五
  homeObj.goFastBet = function(type){
  	//console.log(type);
	  fastBetObj.goBack = function(){
		  fastBetObj.destroy();
		  fastBetConfirmObj.destroy();
		  fastTrendObj.destroy();
		  homeObj.show();
	  }
	  ConfigObj.fastLotType = type;   //高频类型
	  fastBetObj.show(true,function(){
		 // if(type == 'gd11x5'){
		     fastBetObj.updatePlay('R2');
			 //fastBetObj.lotteryCnName = '广东11选5';
		 // }
	  });
  }
  
  
  
  homeObj.goR9Bet = function(){
	 soccerR9Obj.goBack = function(){
		soccerR9Obj.destroy();
		homeObj.show(); 
	 }
	 soccerR9Obj.show(true,function(){
		soccerR9Obj.getData(); 
	 })
  }
  
  homeObj.goTotoBet = function(){
	 soccerTotoObj.goBack = function(){
		soccerTotoObj.destroy();
		homeObj.show(); 
	 }
	 soccerTotoObj.show(true,function(){
		soccerTotoObj.getData(); 
	 })
  }
  
  homeObj.goto2x1Bet = function(){
	 soccer2x1Obj.goBack = function(){
		soccer2x1Obj.destroy();
		homeObj.show(); 
	 }
	 soccer2x1Obj.show(true,function(){
		soccer2x1Obj.getData(); 
	 })
  }
  
  //跳转到竞彩足球
  homeObj.gotoJczqBet = function(){
	  soccerMixObj.goBack = function(){
		  soccerMixObj.destroy();
		  homeObj.show();
	  }
	  soccerMixObj.show(true,function(){
		  soccerMixObj.getData(); 
	  });
  }
  
  //跳转到大乐透
  homeObj.gotoDltBet = function(){
	  dltObj.goBack = function(){
		  dltObj.destroy();
		  dltConfirmObj.destroy();
		  homeObj.show();
	  }
	  dltObj.show(true);
  }
  
  //跳转到双色球
  homeObj.gotoSsqBet = function(){
	  ssqObj.goBack = function(){
		  ssqObj.destroy();
		  ssqConfirmObj.destroy();
		  homeObj.show();
	  }
	  ssqObj.show(true);
  }
  
  //跳转到排列三
  homeObj.gotoPl3Bet = function(){
	  pl3Obj.goBack = function(){
		  pl3Obj.destroy();
		  pl3ConfirmObj.destroy();  
		  homeObj.show();
	  }
	  pl3Obj.show(true);
  }
  
   homeObj.gotoD3Bet = function(){
	  d3Obj.goBack = function(){
		  d3Obj.destroy();
		  d3ConfirmObj.destroy();  
		  homeObj.show();
	  }
	  d3Obj.show(true);
  }
  
  //跳转到排列五
  homeObj.gotoPl5Bet = function(){
	  pl5Obj.goBack = function(){
		  pl5Obj.destroy();
		  pl5ConfirmObj.destroy();  
		  homeObj.show();
	  }
	  pl5Obj.show(true);
  }
  
  //跳转到七星彩
  homeObj.gotoQxcBet = function(){
	  qxcObj.goBack = function(){
		  qxcObj.destroy();
		  qxcConfirmObj.destroy();  
		  homeObj.show();
	  }
	  qxcObj.show(true);
  }


  //请求数据
  homeObj.getData = function () {
      function updatePage(msg) {
//    	msg.info = $.parseJSON(Global.crypt(msg.info));
          if (msg.code == '0000') {
          	  msg.info = $.parseJSON(Global.crypt(msg.info));
              homeObj.ajaxData = msg.info;
              homeObj.ajaxSuccessFun();
              if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
              }
              if (msg.info.analysis_cate_id) {
                  ConfigObj.analysis_cate_id = msg.info.analysis_cate_id
              }
          } else {
              $.alertMsg(msg.code_str);
          }
          if (homeObj.pullLoad) {
              homeObj.pullLoad.resetload();
          }
      }
			var postData = {
			appKey: ConfigObj.appkey,
          version: ConfigObj.version,  
          platForm: ConfigObj.platForm,
          zdid: ConfigObj.zdid
			};
			// console.log(postData)
			
			var secretData = {
					'para' : Global.encrypt(postData)
			};
      Global.getDataPrefCache('?m=system.FrontPage.getnewconf', secretData, function (req) {
   	// console.log(req.info);
   	// console.log(req)
          updatePage(req);
      }, function (req) {
          updatePage(req);
      }, 1);
  }

  //数据返回后回调函数
  homeObj.ajaxSuccessFun = function(){
	  this.createBanner();
      this.createLottery();   
	  this.createNews();
	  if(homeObj.ajaxData.showActivity == true){   
		 //$('#home_actCon').show();   
	  }else{
		 //$('#home_actCon').hide();
	  }
	  this.saveLocalData();
  }
  
  homeObj.saveLocalData = function(obj){
	  localStorage.setItem(ConfigObj.appName + '_topNews',$('#home_scrollBox').html());
	  ConfigObj.lotteryAddPrize = homeObj.ajaxData.lotteryAddPrize;
	  if(homeObj.ajaxData.lotteryAddPrize == undefined){
	  	ConfigObj.lotteryAddPrize = false;
	  	return;
	  }
      localStorage.setItem('lotteryAddPrize', JSON.stringify(homeObj.ajaxData.lotteryAddPrize)); // 加奖数据
	  // localStorage.setItem(ConfigObj.appName + '_botNews',$('#home_botNews').html());
  }
  
  homeObj.initLocalNews = function(){
	   var html = localStorage.getItem(ConfigObj.appName + '_topNews');  
	   if(html){
		   $('#home_scrollBox').html(html);
			homeObj.initScroll();
	   }
	   var html2 = localStorage.getItem(ConfigObj.appName + '_botNews');  
	   if(html2){
		   $('#home_botNews').html(html2);
	   } 
  }
  
  homeObj.createNews = function(){
	  if(homeObj.ajaxData.header_news_top6){
		 var html = '';
		 var data = homeObj.ajaxData.header_news_top6;
//		 //console.log(data);
		 for(var i=0;i<data.length;i++){
			//if(i<2){
				html += '<li><a href="javascript:void(0)"><span class="hot_1">热议</span>  '+ data[i] +'</a></li>'
			//}
		 }
		 $('#home_topNews').find('ul').html(html);
		 if(data.length > 2){
		 	homeObj.initScroll();
		 }
	  }

	  if(homeObj.ajaxData.news_top6){
		  var html = '';
		  var data = homeObj.ajaxData.news_top6;
		  for(var i=0;i<data.length;i++){
			 var itm = data[i];
			 html += '<a href="javascript:void(0)">'+
						'<dl class="clearfix" data-t="detail" data-id="'+ itm.uuid +'">'+
							'<dt><img src="'+ itm.thumb  +'"></dt>'+
							'<dd>'+
								'<h3>'+ itm.title +'</h3>'+
								'<p class="gray font12">'+ itm.description +'</p>'+
							'</dd>'+
						'</dl>'+
					'</a>'  
		  }
		  $('#home_botNews').html(html);
	  }
  }
  
  homeObj.initScroll = function(){
	   var self = this;
	   var ul = $('#home_scrollBox').find('ul');
	   if(ul.length == 2){
		   if(this.marque){
			  clearInterval(homeObj.marque); 
		   }
		   $(ul).css('margin-top',0);
		   this.marque = setInterval(function(){
			   self.scrollFun()
		   }, 4000);
	   }
		 
   }

  
  homeObj.scrollFun = function(){
	   var ul = $('#home_scrollBox').find('ul').get(0);
	   var ul2 = $('#home_scrollBox').find('ul').get(1);
	   var top  = parseInt($(ul).css('margin-top'),10);
	   var height = parseInt($(ul).css('height'),10);
	   if(top <= -height ){
		  $(ul).css('margin-top',0);
		  $(ul2).animate({'margin-top':'-22px'},500);
		  $('#home_scrollBox').append(ul);
	   }else{
		  var newTop = top - 22;
		  $(ul).animate({'margin-top':newTop},500);
	   }
  }

  //创建dom对象
  homeObj.createDomObj = function(){
    this.bannerImgObj = $("#home_bannerImgObj");
    this.bannerDivObj = this.bannerImgObj.parent();
    this.lotteryUlObj = $("#home_lotteryUlObj");
//  this.navObj = $("#home_navObj");
    this.footObj = $("#home_footObj");
	this.chartObj = $('#home_goChart');
	this.bonusObj = $('#home_regnewBonus');
  }
  
  homeObj.createEvent = function(){
	$('#home_wrap').dropload({  
			scrollArea : window,
			distance : 200,
			loadUpFn:function(me){
			    homeObj.pullLoad = me;
				homeObj.getData();
				//me.resetload();
			}
	 })   
	
	this.bannerDivObj.unbind('tap').tap(function(e){
		homeObj.bannerEvent(e);
	})

    this.lotteryUlObj.unbind('tap').tap(function(e){
      homeObj.lotteryEvent(e);
    });
	
	$('#home_botNews').unbind('tap').tap(function(e){
		homeObj.newsEvent(e);
	})
    
    $('#regnewBonus_no').unbind('tap').tap(function(e){
    	$('#home_regnewBonus').hide();
    })
    
    $('#regnewBonus_img').unbind('tap').tap(function(e){
    	 homeObj.goregnewBonus();
			 $('#home_regnewBonus').hide();
    })
    
     $('#regnewBonus_btn').unbind('tap').tap(function(e){
    	homeObj.goRegister();
    	$('#home_regnewBonus').hide();
    })


    
     this.footObj.unbind('tap').tap(function(e){
      homeObj.footEvent(e);
    });

    this.chartObj.unbind('tap').tap(function(){
		homeObj.goChart();
	})
	$('#home_scorePrize').unbind('tap').tap(function(){
		homeObj.goScorePrize();
	})
	$('#home_moreLot').unbind('tap').tap(function(){
		homeObj.goLotteryList();
	})
	$('#home_moreNews').unbind('tap').tap(function(){
		homeObj.goNews();
	})
	$('#home_topNews').unbind('tap').tap(function(){
		homeObj.goTopNews();
	})
	$('#home_act1').unbind('tap').tap(function(){
		homeObj.goRegister();
	})
	$('#home_act2').unbind('tap').tap(function(){
		homeObj.goScoreAct();
	})
	
	//聊天
	$('#home_imWrap').unbind('tap').tap(function(){
		homeObj.goIm();
	})
	
	//链接wifi
	$('#home_wifiImg').unbind('tap').tap(function(){
		homeObj.connectWifi();
	})

	  // 注册送活动
	  $('#home_actReg').on('tap', function () {
		  var url = homeObj.ajaxData.activity.Register.url;
          var arr = url.substring(url.indexOf('?') + 1).split('&');
          var req = {};
          arr.forEach(function (v) {
              var tmp = v.split('=');
              req[tmp[0]] = tmp[1];
          });

          if (req.c_event_id) {
              regsendBonusObj.goBack = function () {
                  regsendBonusObj.destroy();
                  homeObj.show();
              };
              regsendBonusObj.show('', function () {
                  regsendBonusObj.getData(req.c_event_id);
              });
		  }
      });

      // 邀请送活动
      $('#home_actInv').on('tap', function () {
          var url = homeObj.ajaxData.activity.Invitation.url;
          var arr = url.substring(url.indexOf('?') + 1).split('&');
          var req = {};
          arr.forEach(function (v) {
              var tmp = v.split('=');
              req[tmp[0]] = tmp[1];
          });

          if (req.event_id) {
              Global.bgColor = window.getComputedStyle(document.body).backgroundColor;
              invsendBonusObj.goBack = function () {
                  document.body.style.backgroundColor = Global.bgColor;
                  invsendBonusObj.destroy();
                  homeObj.show();
              };
              invsendBonusObj.show(true, function () {
                  document.body.style.backgroundColor = '#f9ddb6';
                  invsendBonusObj.getData(req.c_event_id, req.event_id);
              });
		  }
      });
  }
  
  //链接wifi
  homeObj.connectWifi = function(){
	    if(ConfigObj.platForm == 'android' && typeof android_obj != 'undefined'){
			android_obj.scanWifi();	
		}else if(ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined'){
			ios_obj.gotoWifi();
		}
  }
  homeObj.goregnewBonus = function(){
  			regnewBonusObj.goBack = function() {
            regnewBonusObj.destroy();
            homeObj.show();
        }
        regnewBonusObj.show();
  }
  homeObj.goIm = function(){
	 if(!loginObj.isLogin){
		loginObj.goBack = function(){
			homeObj.show();	
		}
		loginObj.goForward = function(){
			homeObj.show();	
		}
		loginObj.show();
	 }else{
		if(ConfigObj.platForm == 'android'){
			if(typeof android_obj != 'undefined'){
				android_obj.intentConversationlist(); 
			}
		}else if(ConfigObj.platForm == 'ios'){
			if(typeof ios_obj != 'undefined'){
				ios_obj.chatClick(loginObj.access_token)
			}
		}
	 }
  }
  
  homeObj.goTopNews = function(){
	 newsListObj.goBack = function(){
		  newsListObj.destroy();
		  homeObj.show();
	 }
	 newsListObj.show('',function(){
	 	var cid = homeObj.ajaxData.header_news_cate_id || -1;
		newsListObj.getData(cid,'天天中彩头条');
	 }); 
  }
  
  
   homeObj.goRegister = function(){
	 registerObj.goBack = function(){
			userCenterObj.show();	
		}
		registerObj.goForward = function(){
			userCenterObj.show();	
		}
		loginObj.goBack = function(){
			userCenterObj.show();	
		}
		loginObj.goForward = function(){
			userCenterObj.show();	
		}
		registerObj.show(true);
  }
  
  homeObj.goScoreAct = function(){
	 scoreActObj.goBack = function(){
		scoreActObj.destroy();
		homeObj.show(); 
	 }
	 scoreActObj.show('',function(){
		scoreActObj.getData(); 
	 });
  }
  
   homeObj.goNews = function(){
	 newsIdxObj.goBack = function(){
		  newsIdxObj.destroy();
		  homeObj.show();
	 }
	 newsIdxObj.show();
  }
  
  homeObj.goLotteryList = function(){
	 lotteryListObj.goBack = function(){
		  lotteryListObj.destroy();
		  homeObj.show();
	 }
	 lotteryListObj.show('',function(){
		lotteryListObj.setData(homeObj.ajaxData.lottery); 
	 })
  }
  
  homeObj.goChart = function(){
	 chartIdxObj.goBack = function(){

	 	Global.GC();

		chartIdxObj.destroy();
		homeObj.show(); 
	 }
	 chartIdxObj.show('reload');
  }

  //onlaod后执行函数
  homeObj.onloadExecution = function(){
  	
  	$("#home_appName").html(ConfigObj.appName);
  	setTimeout(function(){
  		if(!loginObj.isLogin){
	  		$('#home_regnewBonus').show();
	  	}
  	},500)
  	
    this.createDomObj();
    this.getData();
    this.createEvent();
    this.createBannerHeight();
		this.initLocalNews();
     if(ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined'){  //ios主动获取wifi信息
		// ios_obj.AFNReachability();
	}
  }
	
	homeObj.setDefConfig = function(){
		
	}
	
  homeObj.init = function(){
      homeObj.onloadExecution();
      homeObj.setDefConfig();
      
  }
  
  

