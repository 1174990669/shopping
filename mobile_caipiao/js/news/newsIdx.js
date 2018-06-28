
  var newsIdxObj = new PageController({
	   'name': 'newsIdx',
	   'tpl' : 'template/news/newsIdx.html',
	   'initScrollTop': true
    });



  newsIdxObj.createDomObj = function(){
    this.wrapperObj = $("#newsIdx_wrapperObj");
		this.bannerImgObj = $("#newsIdx_bannerImgObj");
    this.bannerDivObj = this.bannerImgObj.parent();
  }

  newsIdxObj.createEvent = function(){
    this.wrapperObj.tap(function(e){
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "back" : newsIdxObj.goBack();return true;
          case "home": Global.GC(); homeObj.show();return true;
        }        
      }
      var liObj = $.oto_checkEvent(e,"LI");
      if(liObj){
        var thisObj = $(liObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case 'tit':  newsIdxObj.switchNews(thisObj);return true;
		   		case 'link': newsIdxObj.goBannerNews(thisObj.attr('data-v'));return true;
		   		case 'tab' : newsIdxObj.goList(thisObj);return true;
        }        
      }
	  var dlObj = $.oto_checkEvent(e,"DL");
      if(dlObj){
        var thisObj = $(dlObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
           case 'detail':  newsIdxObj.goDetail(thisObj);return true;
        }        
      }
    });
	
	window.onscroll = function() {
         if (!newsIdxObj.checkPage) return false;
		 if($('#newsIdx').css('display') != 'none'){
         	newsIdxObj.updatePage();
		 }
    }
	
	$('#newsIdx_wrap').dropload({  
			scrollArea : window,
			distance : 200,
			loadUpFn:function(me){
			    newsIdxObj.page = 0;
				newsIdxObj.getData();
				newsIdxObj.getNews();
				newsIdxObj.pullLoad = me;
				//me.resetload();
			}
	 })   
  }
  
  
  
  newsIdxObj.updatePage = function(){
	    var scrollTop = document.body.scrollTop;
        var bodyHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + this.clientHeight > bodyHeight - this.clientHeight /2) {
            this.page += 1;
            this.getNews();
        }  
  }
  
  newsIdxObj.goList = function(obj){
	 var id = obj.attr('data-v');
	 var name = obj.text();
	 newsListObj.goBack = function(){
		newsListObj.destroy();
		newsIdxObj.show(); 
	 }
	 newsListObj.show('',function(){
		newsListObj.getData(id,name); 
	 })  
  }

  newsIdxObj.goBannerNews = function (url) {
  	//console.log(url);
  	//console.log(url == null);
      if (url == "null") return;
      var parseSimpleUrl = function (url) {
          var tmp = url.split('/');
					//console.log(tmp);
          var path = tmp[0];
          //console.log(path);
          var id = tmp[4];
//					//console.log(tmp[])
//        if (tmp[4].length) {
//            var tmp2 = tmp[1].split('&');
//            tmp2.forEach(function (v) {
//                var tmp3 = v.split('=');
//                args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
//            })
//        }

          return {path: path, id: id};
      };

      var ret = parseSimpleUrl(url);
			//console.log(ret);
			newsDetailObj.goBack = function(){
				newsDetailObj.destroy();
				newsIdxObj.show(); 
		 }
      newsDetailObj.show('',function(){
							newsDetailObj.getData(ret.id); 
							});
  }
  
  newsIdxObj.goDetail = function(obj){
	 var id = obj.attr('data-id');
	 newsDetailObj.goBack = function(){
		newsDetailObj.destroy();
		newsIdxObj.show(); 
	 }
	 newsDetailObj.show('',function(){
		newsDetailObj.getData(id); 
	 })
  }
  
  newsIdxObj.switchNews = function(obj){
	  var val = obj.attr('data-v');
	  if(obj.hasClass('on')) return;
	  $('#newsIdx_tab li').removeClass('on');
	  obj.addClass('on');
	  $('#newsIdx_list').html('<p class="loading_3"></p>');
	  this.type = val;
	  this.page = 0;
	  this.getNews();
  }
  
  newsIdxObj.getData = function(){
	var postData = {
		access_token : loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite +  '?m=user.news.getPageInfo',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		// console.log('新闻首页信息', msg);
//		//console.log(ConfigObj.pay_id);
		if(msg.code == '0000'){
			newsIdxObj.createBanner(msg.info.img_info.list);
			
			newsIdxObj.setName(msg.info);
		}else{
			$.alertMsg(msg.code_str);	
		}
		if(newsIdxObj.pullLoad){
			newsIdxObj.pullLoad.resetload();	
		}
      }
    });  
  }
  
  newsIdxObj.setName = function(obj){

	  if(obj.category_conf){
		  $('#newsIdx_tab_jryw').html(obj.category_conf['1']['catname']);
		  $('#newsIdx_tab_jryw').parents('li').attr('data-v',obj.category_conf['1']['catid']);
		  
		  $('#newsIdx_tab_szc').html(obj.category_conf['2']['catname']);
		  $('#newsIdx_tab_szc').parents('li').attr('data-v',obj.category_conf['2']['catid']);
		  
		  $('#newsIdx_tab_jjc').html(obj.category_conf['3']['catname']);
		  $('#newsIdx_tab_jjc').parents('li').attr('data-v',obj.category_conf['3']['catid']);
		  
		  $('#newsIdx_tab_zxgg').html(obj.category_conf['4']['catname']);
		  $('#newsIdx_tab_zxgg').parents('li').attr('data-v',obj.category_conf['4']['catid']);
		  
	  }
	  
	  if(obj.local_news_name){  //特殊需求
		$('#newsIdx_zxxx').html(obj.local_news_name);	
	  }
	  if(obj.init_category_id){
		 $('#newsIdx_zxxx').parents('li').attr('data-v',obj.init_category_id);  
	  }
	 
  }
  
 
  
  newsIdxObj.getNews = function(){
	this.checkPage = false;
	var postData = {
		category_id : newsIdxObj.type ? newsIdxObj.type : 1 ,
		page : newsIdxObj.page,
		page_size : newsIdxObj.page_size,
		access_token : loginObj.access_token
	}
    $.ajax({
      url : ConfigObj.localSite +  '?m=user.news.getList',
      data : postData,
      type : "post",
      dataType : "json",
      success : function(msg){
		if(msg.code == '0000'){
			if (msg.list.length < newsIdxObj.page_size) {
				newsIdxObj.checkPage = false;
			} else {
				newsIdxObj.checkPage = true;
			}
			newsIdxObj.formatHtml(msg.list);
			newsIdxObj.saveLocalData();
		}else{
			$.alertMsg(msg.code_str);	
		}
      }
    });    
  }
  
  newsIdxObj.saveLocalData = function(){		//新闻列表缓存
	 localStorage.setItem(ConfigObj.appName + '_newsIdx_top10', $('#newsIdx_list').html());  
  }
  
  newsIdxObj.formatHtml = function(obj){    //生成新闻列表
	if(!obj.length) return;
	var html = '';
	for(var i=0;i<obj.length;i++){
		var itm = obj[i];
		html += '<dl class="clearfix" data-t="detail" data-id="'+ itm.uuid +'" data-url="'+ itm.detailurl +'">'+
					'<dt><img src="'+ itm.thumb +'"></dt>'+
					'<dd>'+
						'<h3>'+ itm.title +'</h3>'+
						'<p class="font9 font12">'+ itm.description +'</p>'+
					'</dd>'+
				'</dl>';
			
	}
	
	if(this.page == 0){
		$('#newsIdx_list').html(html);  
	}else{
		$('#newsIdx_list').append(html);	
	}
	$('#newsIdx_list .loading_3').remove();
  }
  
  //自动生成banner高度
  newsIdxObj.createBannerHeight = function(){
    var bodyWidth = $("body").width();
    var height= bodyWidth/this.defBannerImgProportion ;
    this.bannerImgObj.css("height",height+"px");
    this.bannerDivObj.css("height",height+"px")
  }
  
  //生成banner
  newsIdxObj.createBanner = function(data){
      var imgHtml = [];
      var navHtml = ['<div class="page_scroll"><p class="page">'];
      for(var i=0,ilen=data.length;i<ilen;i++){
        imgHtml.push('<li data-t="link" data-v="'+ data[i]['link_url'] +'"><img src="'+data[i]['img_url']+'"></li>');
        navHtml.push('<a href="javascript:void(0);" class="dot'+(i==0?" on" : "")+'"></a>');
      }
      navHtml.push('</p></div>');
      this.bannerImgObj.html(imgHtml.join(""));
      this.bannerImgObj.after(navHtml.join(""));
      this.bannerNavObj = this.bannerImgObj.next().find("a");
      this.bannerSwipeSlide();
  }

  //banner轮播
  newsIdxObj.bannerSwipeSlide = function(){
    this.bannerDivObj.swipeSlide({
      continuousScroll:true,
      speed:6000,
      lazyLoad:true,
      callback : function(i){
        newsIdxObj.bannerNavObj.removeClass('on');
        newsIdxObj.bannerNavObj.eq(i).addClass('on');
      }
    });
  }
  
  newsIdxObj.initLocalHtml = function(){
	  var html = localStorage.getItem(ConfigObj.appName + '_newsIdx_top10');
	  if(html){
		$('#newsIdx_list').html(html);  
	  }
  }
  
  newsIdxObj.setDefConfig = function(){
	 this.defBannerImgProportion = 640 / 378;  
	 this.clientHeight = document.documentElement.clientHeight;
	 this.page = 0;
	 this.type = 1;
	 this.page_size = 10;
	 window.onscroll = null;
  }
  

  newsIdxObj.onloadExecution = function(){
  this.createDomObj();
  this.createEvent();
	this.createBannerHeight();
	this.initLocalHtml();
	this.getData();
	this.getNews();
  }

  newsIdxObj.init = function(){
	  newsIdxObj.setDefConfig();
      newsIdxObj.onloadExecution();
  }
  

	
	
   
 

