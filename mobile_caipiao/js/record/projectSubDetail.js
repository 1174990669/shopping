
  var projectSubDetailObj = new PageController({
	   'name': 'projectSubDetail',
	   'tpl' : 'template/record/projectSubDetail.html'
    });

  projectSubDetailObj.createDom = function(){
    this.wrapperObj = $("#projectSubDetail_wrapperObj");
	this.wrapA = $('#projectSubDetail_wrapA');
	this.wrapB = $('#projectSubDetail_wrapB');
	this.wrapC = $('#projectSubDetail_wrapC');
	this.wrapD = $('#projectSubDetail_wrapD');
  }

  projectSubDetailObj.createEvent = function(){
    this.wrapperObj.unbind('tap').tap(function(e){
     
      var pObj = $.oto_checkEvent(e,"P");
      if(pObj){
        var thisObj = $(pObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "backbtn" : projectSubDetailObj.goBack();return true;
        }
      }
	  
	  var divObj = $.oto_checkEvent(e,"DIV");
      if(divObj){
        var thisObj = $(divObj);
        var thisT = thisObj.attr("data-t");
        switch(thisT){
          case "ticketDetail" : projectSubDetailObj.goTicketDetail(thisObj.attr('data-v'));return true;
        }
      }
    });
  }
  
  projectSubDetailObj.goTicketDetail = function(id){
	  ticketDetailObj.goBack = function(){
		 ticketDetailObj.destroy();
		 projectSubDetailObj.show();  
	  }
	  ticketDetailObj.show('reload',function(){
		 ticketDetailObj.setData(id);
		 ticketDetailObj.getData();  
	  });
  }

  projectSubDetailObj.onloadExecution = function(){
    this.createDom();
    this.createEvent();
  }

  projectSubDetailObj.init = function(){
    
      projectSubDetailObj.onloadExecution();
    
  }
  
  projectSubDetailObj.setDefConfig = function(){
	 this.product_id = '';   //方案id 
	
  }
  
  projectSubDetailObj.getData = function(id){
	  var self = this;
	  this.product_id = id;  //方案id  请求方案数据，生成html  
	  var postData = {
		'pid' : id 
	  }
	  
	  var secretData = {
	  	'para': Global.encrypt(postData)
	  }
	  $.ajax({
		url : ConfigObj.localSite +  '?m=user.project.pace',
		type:'post',
		data: secretData,
		dataType:'json',
		success:function(obj){
//			//console.log('方案详情子页面subDetail返回数据: ', obj);
			
			if(obj.code == '0000'){
				obj.info = $.parseJSON(Global.crypt(obj.info)); 
				self.formatHtmlA(obj.info);
				self.formatHtmlB(obj.info);
				self.formatHtmlC(obj.info);
				self.formatHtmlD(obj.info);
			}else{
				$.alertMsg(obj.code_str);
			}
		}
	  })
  }
  
  projectSubDetailObj.formatHtmlA = function(obj){
	 var html = '<p class="pt15">投注金额</p>'+
			    '<p class="font12 gray">'+ obj.add_time  +'</p>'+
			    '<span class="font16 fontred money">'+ obj.money +'元</span>';  
	 this.wrapA.html(html); 
  }
  
  projectSubDetailObj.formatHtmlB = function(obj){
	  $('#projectSubDetail_pid').html(obj.project_id);
	  var html =  '<span class="line line_over"><em class="dot dot_over"></em></span>';
	  if(obj.process_status =='opening' || obj.process_status=='dispatching' || obj.process_status=='dispatched' || obj.process_status=='printing'){
		  if(obj.pay_status=='deal'){
			  html += '<span class="line line_over"><em class="dot dot_over"></em></span>';  
		  }else{
			  html += '<span class="line line_over"><em class="dot "></em></span>'
		  }
	  }else{
	  	html += '<span class="line "><em class="dot "></em></span>';
	  }
	  
	  if(obj.process_status=='opening' || obj.process_status=='dispatching' || obj.process_status=='dispatched'){
		  if(obj.print_status=='yes'){
			  html += '<span class="line line_over"><em class="dot dot_over"></em></span>';
		  }else{
			  html += '<span class="line line_over"><em class="dot "></em></span>'
		  }
	  }else if(obj.process_status=='printing'){
		  if(obj.pay_status=='deal'){
			  html +=	'<span class="line"><em class="dot dot_half"></em></span>';
		  }else{
			  html += '<span class="line line_over"><em class="dot"></em></span>';
		  }
	  }else{
		  html += '<span class="line"><em class="dot"></em></span>';
	  }
	  
	  if(obj.process_status=='opening' || obj.process_status=='dispatching' || obj.process_status=='printing' || obj.process_status=='submit'){
		  if(obj.print_status=='yes'){
			 html += '<span class="line"><em class="dot dot_half"></em></span>';
		  }else{
			 html += '<span class="line"><em class="dot"></em></span>';
		  }
	  }else if(obj.process_status=='dispatched'){
		  if(obj.print_status=='yes'){
			  html +=  '<span class="line line_over"><em class="dot dot_over"></em></span>';
		  }else{
			  html += '<span class="line line_over"><em class="dot"></em></span>';
		  }
	  }else{
		  html += '<span class="line"><em class="dot"></em></span>';
	  }
	  
	  if(obj.process_status=='dispatched'){
		  if(obj.print_status=='yes'){
			 html += '<span class="line line_over"><em class="dot dot_over"></em></span>';
		  }else{
			 html += '<span class="line line_over"><em class="dot"></em></span>'; 
		  }
	  }else{
		  html += '<span class="line"><em class="dot"></em></span>';
	  }
	  
	  this.wrapB.html(html);
  }
  
  projectSubDetailObj.formatHtmlC = function(obj){
	  var html = '';
	  html += '<div class="jdli">'+
				  '<p class="">'+ obj.submit_info.msg+ '</p>'+
				  '<p class="font12 gray">'+ obj.submit_info.time_desc + '</p>'+
			  '</div>'+
			  
			  '<div class="jdli">'+
				  '<p class="">'+ obj.pay_info.msg + '</p>'+
				  '<p class="font12 gray">'+ obj.pay_info.time_desc + '</p>'+
			  '</div>'+
			  
			  '<div class="jdli" ' + (obj.is_havingticket=='Y' ? 'data-t="ticketDetail" data-v="' + obj.project_id + '"' : '') +'>'+
				  '<p class="">'+ obj.print_info.msg + 
				  (obj.is_havingticket=='Y' ? '<a href="javascript:void(0)" ><em class="arrow"></em></a>' : '')  +
				  '</p>'+
				  '<p class="font12 gray">'+ obj.print_info.time_desc + '</p>'+
			  '</div>'+
			  
			  '<div class="jdli">'+
				  '<p class="">'+ obj.open_info.msg + '</p>'+
				  '<p class="font12 gray">'+ obj.open_info.time_desc + '</p>'+
			  '</div>'+
			  
			  '<div class="jdli">'+
				  '<p class="">' + obj.dispatch_info.msg + '</p>'+
				  '<p class="font12 gray">'+ obj.dispatch_info.time_desc + '</p>'+
			  '</div>';
	 this.wrapC.html(html);
	  
  }
  
  projectSubDetailObj.formatHtmlD = function(obj){
  	  var html = '';
	  if(obj.current_status == "succ"){
		 html += '<p class="smtip font16"><span class="suc_icon tipicon"></span>' + obj.current_statuscn + '</p>';
	  }else if( obj.current_status=="printing"){
		 html +=  '<p class="smtip font16"><span class="wait_icon tipicon"></span>' + obj.current_statuscn + '</p>';
	  }else if(obj.current_status=="fail"){
		 html += '<p class="smtip font16"><span class="err_icon tipicon"></span>' + obj.current_statuscn+ '</p>';
	  }
	  this.wrapD.html(html);
  }
  
  
