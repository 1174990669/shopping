
<script type="text/javascript">
			   function tell_me(goods_id, no_have_val)
			   {
			
			  no_have = (typeof(no_have_val) == "undefined" ? 0 : no_have_val)
			  Ajax.call('user.php?act=book_goods', 'id=' + goods_id + '&no_have=' + no_have, collectResponse, 'GET', 'JSON');
			
				}
				
				function collectResponse(result)
			{
				if(result.error==1)
				{
				//document.getElementById('tell_me_form').style.display = document.getElementById('tell_me_form').style.display=='none'?'block':'none';
				document.getElementById('tell_me_form').style.display = 'block';
				document.getElementById('bg').style.display='block';
				document.getElementById('phone_num').value=result.tel;
				document.getElementById('arrival_email').value=result.email;

				}
				 if(result.error==0)
				 {
					 alert(result.message);
					 }
				 if(result.error==2)
				  {
					  alert(result.message);
				  	  document.getElementById('tell_me_form').style.display = document.getElementById('tell_me_form').style.display=='none'?'block':'none';
					  document.getElementById('bg').style.display='none';
					  }
				 
			}
			 function tell_me1(goods_id, no_have_val)
			{
				var num=document.getElementById('book_number').value;
				var tel=document.getElementById('phone_num').value;
				var email=document.getElementById('arrival_email').value;
				
				no_have = (typeof(no_have_val) == "undefined" ? 0 : no_have_val)
				Ajax.call('user.php?act=add_book_goods', 'id=' + goods_id + '&no_have=' + no_have+ '&num=' + num+ '&tel=' + tel+ '&em=' + email, collectResponse, 'GET', 'JSON');
				
				
			}
    </script>
<div id="tell_me_form" style="display:none;">
  <div class="tell_me_tit">到货通知<span class="tell_me_close"></span></div>
  <div class="tell_me_con">
    <table cellpadding=0 cellspacing=0 width="100%" border=0>
      <tr>
        <td colspan="2" align=left style="padding:15px 0 15px 0;"><div style="background:#FFFDEE ;padding:10px 10px;border:1px dotted #ff3300;height:40px;line-height:150%; font-weight:normal">
            <p style="font-size:15px;color:#F52648;padding-bottom:5px;"><?php echo sub_str($this->_var['goods']['goods_name'],20); ?></p>
            当商品进行补货时，我们将以短信、邮件的形式通知您，最多发送一次，不会对您造成干扰。 </div></td>
      </tr>
      <tr>
        <td width="150" align="right">数量：</td>
        <td><input type="text" value="1" id="book_number" /></td>
      </tr>
      <tr>
        <td align="right">手机号码：</td>
        <td><input type="text" value="" id="phone_num" /></td>
      </tr>
      <tr>
        <td align="right">电子邮箱：</td>
        <td><input type="text" value="" id="arrival_email" /></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><input type="button" value="提交" onclick="tell_me1(<?php echo $this->_var['goods']['goods_id']; ?>)" class="tell_btn"/>
          <input type="reset" value="重置"   class="tell_btn"/></td>
      </tr>
    </table>
  </div>
</div>
<script>
                $(function(){
					$('#tell_me_form').css('left',($(window).width()-500)/2);
					$('#tell_me_form').css('top',($(window).height()-300)/2);
					$('.tell_me_close').click(function(){
						$('#tell_me_form').hide();	
						document.getElementById('bg').style.display='none';
					})
				})
                </script> 
