<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<base href="http://www.sharpstar.cn/" />
<meta name="Generator" content="68ECSHOP v4_1" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

<title><?php echo $this->_var['page_title']; ?></title>



<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link rel="stylesheet" type="text/css" href="themes/68ecshopcom_360buy/css/68ecshop_commin.css" />
<link type="text/css" rel="stylesheet" href="themes/68ecshopcom_360buy/css/passport.css" />
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery_email.js"></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/validate/jquery.validate.js"></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/validate/messages_zh.js"></script>
<script type="text/javascript" src="themes/68ecshopcom_360buy/js/placeholder.js"></script>
<?php echo $this->smarty_insert_scripts(array('files'=>'jquery.json.js,transport.js')); ?> <?php echo $this->smarty_insert_scripts(array('files'=>'common.js,user.js')); ?>
</head>
<body>
<script>
function erweima1(obj, sType) { var oDiv = document.getElementById(obj); if (sType == 'show') {oDiv.style.display = 'block';} if (sType == 'hide') {oDiv.style.display = 'none';} }
</script>
	<div class="Logo-r">
		<div class="Logo-info-r">
			<!-- <a href="./" class="logo"></a> -->
			<span class="findpw">找回密码</span>
			<?php echo $this->fetch('library/user_right.lbi'); ?>
		</div>
	</div>
	<div class="w">
		
		<?php if ($this->_var['action'] == 'step_1'): ?>
		<div id="find_pw">
			<div class="find_con">
				<div id="sflex04" class="stepflex">
					<dl class="first doing">
						<dt class="s-num">1</dt>
						<dd class="s-text">
							填写账户名
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal">
						<dt class="s-num">2</dt>
						<dd class="s-text">
							验证身份
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal">
						<dt class="s-num">3</dt>
						<dd class="s-text">
							设置新密码
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="last">
						<dt class="s-num">&nbsp;</dt>
						<dd class="s-text">
							完成
							<s></s>
							<b></b>
						</dd>
					</dl>
				</div>
				<div id="find-box" class="uc_box">
					<div class="find_pwd_con">
						
						<form action="findPwd.php?XDEBUG_SESSION_START=ECLIPSE_DBGP" method="post" id="fpForm" name="fpForm">
							<input type="hidden" name="action" value="check_username" />
							<div id="error_container"></div>
							<div class="item">
								<label>账户名</label>
								<input name="u_name" id="u_name" type="text" tabindex="1" placeholder="<?php echo $this->_var['lang']['label_input_uname']; ?>" class="text" />
							</div>
							<div class="item">
								<label>验证码</label>
								<input type="text" id="captcha" name="captcha" tabindex="2" placeholder="请输入<?php echo $this->_var['lang']['comment_captcha']; ?>" autocomplete="off" class="text text_te" />
								<label class="img" style="margin-left: 5px">
									<img src="captcha.php?<?php echo $this->_var['rand']; ?>" alt="captcha" style="vertical-align: middle; cursor: pointer; height: 35px;" onClick="this.src='captcha.php?'+Math.random()" />
								</label>
							</div>
							<div class="item">
								<label></label>
								<input type="button" id="btn_submit" class="btn_next" value="下一步" />
								<input type="hidden" name="act" value="check_username" />
							</div>
                            <div class="item">
                            	 <h2 class="find_pw_tit"><span>如果您忘记了账户名，将无法找回您的账户信息，您还可以重新<a href="register.php" title="立即注册">注册&gt;&gt;</a></span></h2>
                            </div>
						</form>
					</div>
				</div>
			</div>
			<div class="shadow_l"></div>
			<div class="shadow_r"></div>
			<script type="text/javascript">
			$().ready(function(){
				var container = $("#error_container");
				$("#fpForm").validate({
					rules: {
						u_name: "required",
						captcha: {
							required: true,
							maxlength: 4
						}
					},
					messages: {
						u_name: "请输入您的用户名/邮箱/已验证的手机",
						captcha: {
							required: "验证码不能为空",
							max: "验证码格式不正确"
						}
					},
					errorPlacement: function(error, element) {
						error.appendTo(element.parent());
					}
				});
				$("#btn_submit").click(function(){
					$("#fpForm").submit();
				});
			});
			</script>
		</div>
		<?php endif; ?>
		<?php if ($this->_var['action'] == 'step_2'): ?>
		<div id="find_pw" class="find_pw2">
			<div class="find_con">
				<div id="sflex04" class="stepflex">
					<dl class="first done">
						<dt class="s-num">1</dt>
						<dd class="s-text">
							填写账户名
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal doing">
						<dt class="s-num">2</dt>
						<dd class="s-text">
							验证身份
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal">
						<dt class="s-num">3</dt>
						<dd class="s-text">
							设置新密码
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="last">
						<dt class="s-num">&nbsp;</dt>
						<dd class="s-text">
							完成
							<s></s>
							<b></b>
						</dd>
					</dl>
				</div>
				<div id="find-box" class="uc_box">
					<form action="findPwd.php" method="post" id="fpForm" name="fpForm">
						<div class="find_pwd_con">
							<input type="hidden" name="act" value="to_reset_password" />
							<div id="error_container"></div>
							<div class="item">
								<label>请选择验证身份方式：</label>
								<select id="validate_type" name="validate_type">
									<?php $_from = $this->_var['validate_types']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['item']):
?>
									<option id="validate_type_<?php echo $this->_var['item']['type']; ?>" value="<?php echo $this->_var['item']['type']; ?>" val="<?php echo $this->_var['item']['value']; ?>"><?php echo $this->_var['item']['name']; ?></option>
									<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
								</select>
							</div>
							<div class="item v_mobile_phone v_item" style="display: none">
								<label>手机号：</label>
								<span id="l_mobile_phone"></span>
							</div>
							<div id="c_mobile_code" class="item v_mobile_phone v_item" style="display: none">
								<label>请输入手机短信验证码：</label>
								<input type="text" id="mobile_code" name="mobile_code" class="text text_te2" value="" />
								<input id="zphone" type="button" value="获取手机验证码" class="code">
							</div>
							<div class="item v_email v_item" style="display: none">
								<label>邮箱地址：</label>
								<span id="l_email"></span>
							</div>
							<div id="c_email" class="item v_email v_item" style="display: none">
								<label>请输入邮箱验证码：</label>
								<input type="text" id="email_code" name="email_code" class="text text_te2" value="" />
								<input id="zemail" type="button" value="获取邮箱验证码" class="code">
							</div>
							<div class="item">
								<input type="button" name="button" id="btn_submit" class="btn_next" value="提交" />
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="shadow_l"></div>
			<div class="shadow_r"></div>
			<script type="text/javascript">
			function show_validate_type(validate_type_obj){
				var type = $(validate_type_obj).val();
				var value = $("#validate_type_"+type).attr("val");
				$("#l_"+type).html(value);
				$(".v_item").hide();
				$(".v_"+type).show();
			}
			
			function send_email_code(emailCodeObj, sendButton){
				// 发送邮件
				var url = 'validate.php';
				$.post(url, {
					act: 'send_email_code'
				}, function(result) {
					if (result == 'ok') {
						//倒计时
						countdown(sendButton);
					} else {
						alert(result);
					}
				}, 'text');
			}
			
			function send_mobile_code(mobileCodeObj, sendButton) {
				// 发送邮件
				var url = 'validate.php';
				$.post(url, {
					act: 'send_mobile_code'
				}, function(result) {
					if (result == 'ok') {
						//倒计时
						countdown(sendButton);
					} else {
						alert(result);
					}
				}, 'text');
			}
			
			$().ready(function(){
				
				show_validate_type($("#validate_type"));
				
				var validator = $("#fpForm").validate({
				    debug: false,
				    rules: {
				    	mobile_code: {
				            required: true
				        },
				        email_code: {
				            required: true
				        }
				    },
				    messages: {
				    	mobile_code: {
				            required: "请输入手机短信验证码"
				        },
				        email_code: {
				            required: "请输入邮箱验证码"
				        }
				    },
				    errorPlacement: function(error, element) {
				        error.appendTo(element.parent());  
				    }
				});
				
				$("#validate_type").change(function(){
					show_validate_type($(this));
				});
				
				$("#zphone").click(function(){
					send_mobile_code($("#mobile_code"), $(this));
				});
				
				$("#zemail").click(function(){
					send_email_code($("#email_code"), $(this));
				});
				
				$("#btn_submit").click(function(){
					
					if(!validator.form()){
				        return;
				    }
					
					var type = $("#validate_type").val();

					var url = "findPwd.php";
					var validate_type = $("#validate_type").val();
					$.post(url, {act: "validate", mobile_code: $("#mobile_code").val(), email_code: $("#email_code").val(), validate_type: validate_type}, function(data){
						if(data.error == 1){
							alert(data.content);
							if(data.url != undefined && data.url.length > 0){
								window.location.href = data.url;
							}
						}else{
							$("#fpForm").submit();
						}
					}, "json");
				});
				
			});
			</script>
		</div>
		<?php endif; ?>
		<?php if ($this->_var['action'] == 'step_3'): ?>
		<div id="find_pw3">
			<div class="find_con">
				<div id="sflex04" class="stepflex">
					<dl class="first done">
						<dt class="s-num">1</dt>
						<dd class="s-text">
							填写账户名
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal done">
						<dt class="s-num">2</dt>
						<dd class="s-text">
							验证身份
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal doing">
						<dt class="s-num">3</dt>
						<dd class="s-text">
							设置新密码
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="last">
						<dt class="s-num">&nbsp;</dt>
						<dd class="s-text">
							完成
							<s></s>
							<b></b>
						</dd>
					</dl>
				</div>
				<div id="find-box" class="uc_box">
					<form action="findPwd.php" method="post" id="fpForm" name="fpForm">
						<div class="find_pwd_con">
							<input type="hidden" name="act" value="to_success" />
							<div id="error_container"></div>
							<div class="item">
								<label>设置密码</label>
								<input name="password" id="password" type="password" tabindex="1" placeholder="请输入密码" class="text" />
							</div>
							<div class="item">
								<label>确认密码</label>
								<input name="confirm_password" id="confirm_password" type="password" tabindex="2" placeholder="请再次确认密码" class="text" />
							</div>
							<div class="item">
								<label></label>
								<input type="button" id="btn_submit" name="btn_submit" class="btn_next" value="提交" />
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="shadow_l"></div>
			<div class="shadow_r"></div>
			<script type="text/javascript">
			$().ready(function(){
				var validator = $("#fpForm").validate({
					debug: false,
					rules: {
						password: {
							required: true,
							minlength: 6
						},
						confirm_password: {
							required: true,
							equalTo: "#password"
						}
					},
					messages: {
						password: {
							required: "请输入密码",
							minlength: "登录密码不能少于 6 个字符"
						},
						confirm_password: {
							required: "请再次输入新密码",
							equalTo: "两次输入的密码不一致，请重新输入"
						}
					},
					errorPlacement: function(error, element) {
						error.appendTo(element.parent());  
					}
				});
				
				$("#btn_submit").click(function(){
					if(!validator.form()){
						return;
					}
					
					var url = "findPwd.php?XDEBUG_SESSION_START=ECLIPSE_DBGP";
					$.post(url, {act: 'reset_password', password: $("#password").val()}, function(data){
						if(data.error == 1){
							alert(data.content);
							if(data.url != undefined && data.url.length > 0){
								window.location.href = data.url;
							}
						}else{
							$("#fpForm").submit();
						}
					}, "json");
						
				});
			});
			</script>
		</div>
		<?php endif; ?>
		<?php if ($this->_var['action'] == 'step_4'): ?>
		<div id="find_pw3">
			<div class="find_con">
				<div id="sflex04" class="stepflex">
					<dl class="first done">
						<dt class="s-num">1</dt>
						<dd class="s-text">
							填写账户名
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal done">
						<dt class="s-num">2</dt>
						<dd class="s-text">
							验证身份
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="normal done">
						<dt class="s-num">3</dt>
						<dd class="s-text">
							设置新密码
							<s></s>
							<b></b>
						</dd>
					</dl>
					<dl class="last doing">
						<dt class="s-num">&nbsp;</dt>
						<dd class="s-text">
							完成
							<s></s>
							<b></b>
						</dd>
					</dl>
				</div>
				<div id="find-box" class="uc_box">
					<div class="find_pwd_con">
						<div class="find_box_end">
							<p>
								<i></i>
								新密码设置成功！
							</p>
							<p>请您牢记新密码！</p>
							<p class="on_go">
								<a href="user.php" title="立即购物">立即登录&gt;&gt;</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="shadow_l"></div>
			<div class="shadow_r"></div>
		</div>
		<?php endif; ?>
		<?php if ($this->_var['action'] == 're_pass'): ?>
		<script type="text/javascript">
	    <?php $_from = $this->_var['lang']['password_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
	      var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
	    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	    </script>
		<div id="entry1">
			<div class="mcon">
				<div id="reg-pic" class="box-pic box-pic2"></div>
				<div id="login-box" class="uc_box">
					<form action="user.php" method="post" name="getPassword2" onSubmit="return submitPwd()">
						<div class="form">
							<h2>
								<strong>重置密码</strong>
							</h2>
							<div class="item">
								<input id="new_password" name="new_password" type="password" class="text" tabindex="1" value="<?php echo $this->_var['lang']['new_password']; ?>" onfocus="if(this.value=='<?php echo $this->_var['lang']['new_password']; ?>') this.value=''" onblur="if(this.value=='') this.value='<?php echo $this->_var['lang']['new_password']; ?>'" />
								<div>
									<span class="label"></span>
								</div>
							</div>
							<div class="item">
								<input name="confirm_password" type="password" class="text" tabindex="1" value="<?php echo $this->_var['lang']['confirm_password']; ?>" onfocus="if(this.value=='<?php echo $this->_var['lang']['confirm_password']; ?>') this.value=''" onblur="if(this.value=='') this.value='<?php echo $this->_var['lang']['confirm_password']; ?>'" />
								<div>
									<span class="label"></span>
								</div>
							</div>
							<div class="item">
								<input type="hidden" name="act" value="act_edit_password" />
								<input type="hidden" name="uid" value="<?php echo $this->_var['uid']; ?>" />
								<input type="hidden" name="code" value="<?php echo $this->_var['code']; ?>" />
								<input type="submit" name="submit" class="btn-img btn-regist" value="提交" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<?php endif; ?>
		
		
		<?php if ($this->_var['action'] == 'get_password'): ?>
		<?php echo $this->smarty_insert_scripts(array('files'=>'utils.js')); ?>
		<script type="text/javascript">
    <?php $_from = $this->_var['lang']['password_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
      var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </script>
		<div class="w" id="entry">
			<div class="mcon">
				<div id="reg-pic" class="box-pic box-pic2"></div>
				<div id="login-box" class="uc_box">
					<form action="user.php" method="post" name="getPassword" onsubmit="return submitPwdInfo();">
						<div class="form">
							<h2>
								<strong>找回密码</strong>
							</h2>
							<div class="item item_gqu"><?php echo $this->_var['lang']['username_and_email']; ?></div>
							<div class="item">
								<span class="label"><?php echo $this->_var['lang']['username']; ?></span>
								<div>
									<input name="user_name" type="text" class="text" />
								</div>
							</div>
							<div class="item">
								<span class="label"><?php echo $this->_var['lang']['email']; ?></span>
								<div>
									<input name="email" type="text" class="text" />
								</div>
							</div>
							<div class="item item_qpass">
								<input type="hidden" name="act" value="send_pwd_email" />
								<input type="submit" name="submit" value="<?php echo $this->_var['lang']['submit']; ?>" class="btn-entry" />
								<input name="button" type="button" onclick="history.back()" value="<?php echo $this->_var['lang']['back_page_up']; ?>" style="border: none;" class="btn-img" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<?php endif; ?>
		
		<?php if ($this->_var['action'] == 'qpassword_name'): ?>
		<div class="w" id="entry">
			<div class="mcon">
				<div id="reg-pic" class="box-pic box-pic2"></div>
				<div id="login-box" class="uc_box">
					<form action="user.php" method="post">
						<div class="form">
							<h2>
								<strong>找回密码</strong>
							</h2>
							<div class="item item_gqu"><?php echo $this->_var['lang']['get_question_username']; ?></div>
							<div class="item">
								<span class="label">用户名：</span>
								<div>
									<input name="user_name" type="text" class="text" />
								</div>
							</div>
							<div class="item item_qpass">
								<input type="hidden" name="act" value="get_passwd_question" />
								<input type="submit" name="submit" class="btn-entry" value="<?php echo $this->_var['lang']['submit']; ?>" />
								<input name="button" type="button" onclick="history.back()" value="<?php echo $this->_var['lang']['back_page_up']; ?>" style="border: none;" class="btn-img" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<?php endif; ?>
		
		<?php if ($this->_var['action'] == 'get_passwd_question'): ?>
		<div class="w" id="entry">
			<div class="mcon">
				<div id="reg-pic" class="box-pic box-pic2"></div>
				<div id="login-box" class="uc_box">
					<form action="user.php" method="post">
						<div class="form">
							<h2>
								<strong>找回密码</strong>
							</h2>
							<div class="item item_gqu"><?php echo $this->_var['lang']['input_answer']; ?></div>
							<div class="item">
								<span class="label"><?php echo $this->_var['lang']['passwd_question']; ?>：</span>
								<div><?php echo $this->_var['passwd_question']; ?></div>
							</div>
							<div class="item">
								<span class="label"><?php echo $this->_var['lang']['passwd_answer']; ?>：</span>
								<div>
									<input name="passwd_answer" type="text" class="text" />
								</div>
							</div>
							<div class="item">
								<span class="label"><?php echo $this->_var['lang']['comment_captcha']; ?>：</span>
								<div>
									<input type="text" id="authcode" size="8" name="captcha" class="text text_te" style="ime-mode: disabled" autocomplete="off" MaxLength="6" />
									<label class="img" style="margin-left: 5px">
										<img src="captcha.php?<?php echo $this->_var['rand']; ?>" alt="captcha" style="vertical-align: middle; cursor: pointer;" onClick="this.src='captcha.php?'+Math.random()" />
									</label>
								</div>
							</div>
							<div class="item item_qpass">
								<input type="hidden" name="act" value="check_answer" />
								<input type="submit" name="submit" value="<?php echo $this->_var['lang']['submit']; ?>" class="btn-entry" />
								<input name="button" type="button" onclick="history.back()" value="<?php echo $this->_var['lang']['back_page_up']; ?>" style="border: none;" class="btn-img" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<?php endif; ?>
		<?php if ($this->_var['action'] == 'reset_password'): ?>
		<script type="text/javascript">
    <?php $_from = $this->_var['lang']['password_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
      var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </script>
		<div class="w" id="entry">
			<div class="mcon">
				<div id="reg-pic" class="box-pic box-pic2"></div>
				<div id="login-box" class="uc_box">
					<form action="user.php" method="post" name="getPassword2" onSubmit="return submitPwd()">
						<div class="form">
							<h2>
								<strong>重置密码</strong>
							</h2>
							<div class="item">
								<span class="label"><?php echo $this->_var['lang']['new_password']; ?></span>
								<div>
									<input id="new_password" name="new_password" type="password" class="text" />
								</div>
							</div>
							<div class="item">
								<span class="label"><?php echo $this->_var['lang']['confirm_password']; ?></span>
								<div>
									<input name="confirm_password" type="password" type="text" class="text" />
								</div>
							</div>
							<div class="item">
								<input type="hidden" name="act" value="act_edit_password" />
								<input type="hidden" name="uid" value="<?php echo $this->_var['uid']; ?>" />
								<input type="hidden" name="code" value="<?php echo $this->_var['code']; ?>" />
								<input type="submit" name="submit" value="<?php echo $this->_var['lang']['confirm_submit']; ?>" class="btn-img btn-entry" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<?php endif; ?>
		
		<div class="blank"></div>
	</div>
	<?php echo $this->fetch('library/page_footer.lbi'); ?>
</body>
<script type="text/javascript">
var process_request = "<?php echo $this->_var['lang']['process_request']; ?>";
<?php $_from = $this->_var['lang']['passport_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
var username_exist = "<?php echo $this->_var['lang']['username_exist']; ?>";
</script>
</html>
