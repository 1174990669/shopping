<script type="text/javascript">
function fun1()
{
 	$("#right_login").children(".dropdown").show();
 	var id=1;
 	Ajax.call('user.php?act=login_check_yzm', 'id=' + id,  collectResponses, 'GET', 'JSON');
}
function onmouseroutfun(){
 	$("#right_login").children(".dropdown").hide();
}
function collectResponses(result)
{
	document.getElementsByName('back_act').value = result.message;
	if(result.error>0)
	{
		document.getElementById('o-authcode').style.display='block';
	}
	else
	{
	document.getElementById('o-authcode').style.display='none';
	}
}
</script>
<div class="sidebar-nav" style="height: 100%; top: 0px; bottom: auto;">
  <div class="mods">
    <div class="middle-items">
      <div class="mod_head" id="right_login" onMouseOver="fun1();" onMouseOut="onmouseroutfun();" > 
        <a href="user.php" class="btn_head" title="我的用户中心">
      	 	<img src="themes/68ecshopcom_360buy/images/upgrade_ad/user_head.png" />
        </a>
        <div class="dropdown" style="display: none; opacity: 1; margin-right: 0px;"> 
        <?php if (! $_SESSION['user_id'] > 0): ?>
          <form name="formLogin" action="user.php" method="post" onSubmit="return userLogin()">
          <div class="form">
            <h2><strong>请登录</strong><span>还没有账号？<a href="register.php" class="right_register">立即注册</a></span></h2>
            <div class="item"> <span class="label">账号</span>
              <div>
                <input name="username" type="text" class="text" value="" tabindex="1"/>
              </div>
            </div>
            <div class="item"> <span class="label">密码</span>
              <div>
                <input type="password" id="password" name="password" class="text" tabindex="2"/>
              </div>
            </div>
            <div class="item " id="o-authcode"> <span class="label_t">验证码</span>
              <div>
                <input type="text" id="authcode" name="captcha" class="text text-1" tabindex="3"/>
                <label class="img"> <img src="captcha.php?is_login=1&<?php echo $this->_var['rand']; ?>" alt="captcha" style="vertical-align: middle;cursor: pointer;" onClick="this.src='captcha.php?is_login=1&'+Math.random()" /> </label>
              </div>
            </div>
            <div class="item" id="autoentry">
              <div class="safety">
                <input type="checkbox" value="1" name="remember" id="remember" class="checkbox"/>
                <label for="remember" class="mar-b">记住密码</label>
                <a class="forget_password" href="findPwd.php">忘记密码？</a>
            </div>
            </div>
            <div class="item">
              <input type="hidden" name="act" value="act_login" />
              <input type="hidden" name="back_act"  value=''/>
              <input type="submit" name="submit" class="btn-img" id="loginsubmit" value="立即登录" />
            </div>
          </div>
        </form>
        <?php else: ?>
         <div class="form">
            <h2 class="username"><?php echo $_SESSION['user_name']; ?></h2>
            <div class="login_right">
            	<ul class="login-item">
					<li class="member"><i></i><a href="user.php">会员中心</a></li>
                    <li class="order"><i></i><a href="user.php?act=order_list">订单中心</a></li>
					<li class="account"><i></i><a href="user.php?act=account_detail">帐户中心</a></li>
					<li class="message_list"><i></i><a href="user.php?act=message_list">我的留言</a></li>
				</ul>
            </div>
         </div> 
        <?php endif; ?>
          <span class="cart_arrow" style="background:none;border:none"><b class="arrow-1"></b> <b class="arrow-2"></b></span> 
        </div>
      </div>
      <div class="mod online-service J-stie-68"> <a href="javascript:;" class="btn">
        <table>
          <tbody>
            <tr>
              <td><i></i> <em>销 售</em></td>
            </tr>
            <tr>
              <td>在 线<br>
                销 售</td>
            </tr>
          </tbody>
        </table>
        </a>
        <div class="dropdown" style="display: none; opacity: 1; margin-right: 0px;">
          <div class="head clearfix">
            <h3 class="grid-c-l">在线销售顾问</h3>
          </div>
          <div class="button-bar"> 
            
            <?php echo $this->fetch('library/customer_service.lbi'); ?> 
             
          </div>
          <span class="cart_arrow"><b class="arrow-1"></b> <b class="arrow-2"></b></span></div>
      </div>
      <div class="mod vote_list J-stie-68"> <a href="javascript:;" class="btn">
        <table>
          <tbody>
            <tr>
              <td><i></i> <em>调 查</em></td>
            </tr>
            <tr>
              <td>在 线<br>
                调 查</td>
            </tr>
          </tbody>
        </table>
        </a>
        <div class="dropdown" style="display: none; opacity: 1; margin-right: 0px;">
          <div class="head clearfix">
            <h3 class="grid-c-l">在线调查问卷</h3>
          </div>
          <div class="button-bar"> 
          <?php echo $this->fetch('library/vote_list.lbi'); ?> 
          </div>
          <span class="cart_arrow"><b class="arrow-1"></b> <b class="arrow-2"></b></span></div>
      </div>
      <div class="mod reserve" style="height:135px;" id="ECS_CARTINFO">
      <?php 
$k = array (
  'name' => 'cart_info',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?>
      </div>
      <div class="mod traffic"> <span class="btn">
        <table>
          <tbody>
            <tr>
              <td><i></i> <em>关 注</em></td>
            </tr>
            <tr>
              <td><a href="user.php?act=follow_shop" target="_blank" class="btn">关注<br>
                店铺</a></td>
            </tr>
          </tbody>
        </table>
        </span> </div>
      <div class="mod insure" id="collectGoods"> <span class="btn">
        <table>
          <tbody>
            <tr>
              <td><i></i> <em>收 藏</em></td>
            </tr>
            <tr>
              <td><a href="user.php?act=collection_list" class="btn">收 藏<br>
                商 品</a></td>
            </tr>
          </tbody>
        </table>
        </span> </div>
      
       <div class="mod qrcode J-stie-68"> <a href="javascript:;" class="btn">
        <table>
          <tbody>
            <tr>
              <td><i></i></td>
            </tr>
            <tr>
              <td>官 方<br>
                微 信</td>
            </tr>
          </tbody>
        </table>
        </a>
        <div class="dropdown  dropdown_t" style="display: none; opacity: 1; margin-right: 0px;"> <span></span>
          <p>扫描二维码，码上有礼！</p>
          <span class="cart_arrow" style="background:none;border:none"><b class="arrow-1"></b> <b class="arrow-2"></b></span> </div>
      </div> 
    </div>
    <div class="bottom-items">
      <div class="mod top disabled"> <a href="javascript:;" class="btn">
        <table>
          <tbody>
            <tr>
              <td><i></i></td>
            </tr>
            <tr>
              <td>回 到<br>
                顶 部</td>
            </tr>
          </tbody>
        </table>
        </a> </div>
    </div>
  </div>
</div> 
<script type="text/javascript">
$(".J-stie-68").mouseover(function(){
 $(this).children(".dropdown").show();
 })
 $(".J-stie-68").mouseout(function(){
 $(this).children(".dropdown").hide();
 })
$(".J-stie-68").mouseleave(function(){
 $(this).children(".dropdown").hide();
 })

</script>
<script type="text/javascript">
$(document).ready(function(){ 
var headHeight2=200;  //这个高度其实有更好的办法的。使用者根据自己的需要可以手工调整。
 
var top=$(".top");       //要悬浮的容器的id
$(window).scroll(function(){ 
 
if($(this).scrollTop()>headHeight2){ 
top.removeClass("disabled");  
}
else{ 
top.addClass("disabled"); 
} 
}) 
})
$(".top").click(function(){
$('body,html').animate({scrollTop:0},800);
return false;
});
$("#mod-fold").click(function(){
$('.sidebar-nav').hasClass('fold') ? $('.sidebar-nav').removeClass('fold') : $('.sidebar-nav').addClass('fold');
});
</script>
