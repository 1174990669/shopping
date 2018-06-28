var findPwdObj = new PageController({
    'name': 'findPwd',
    'tpl': 'template/user/findPwd.html'
});

findPwdObj.createDomObj = function () {
    findPwdObj.getSmsCodeObj = $('#findPwd_getsmscode');
}

findPwdObj.createEvent = function () {
    $('#findPwd_backObj').unbind('tap').tap(function () {findPwdObj.goBack();});
    $('#findPwd_getsmscode').unbind('tap').tap(function () {findPwdObj.getSmsCode();});
    $('#findPwd_submitObj').unbind('tap').tap(function () {findPwdObj.submitData();});
}

findPwdObj.submitData = function () {
    var phone = $('#findPwd_phone').val();
    var smscode = $('#findPwd_smscode').val();
    var password1 = $('#findPwd_password1').val();
    var password2 = $('#findPwd_password2').val();
//  console.log(password1);
    // 验证
    if (phone.length == 0) {$.alertMsg('请先填写手机号码'); return false;}
    if (!/^1\d{10}$/g.test(phone)) {$.alertMsg('手机号码格式错误'); return false;}
    if (smscode.length < 1) {$.alertMsg('请填写短信验证码'); return false;}
    if (password1.length == 0) {$.alertMsg('请输入密码'); return false;}
    if (!/^\w{6,16}$/g.test(password1)) {$.alertMsg('密码格式错误'); return false;}
    if (password2.length == 0) {$.alertMsg('请再次确认密码'); return false;}
    if (password1 != password2) {$.alertMsg('两次密码不一致'); return false;}

    Global.post('?m=user.account.findPwd', {
        'mobile': phone,
        'smsCode': smscode,
        'passWord1': hex_md5(password1),
        'passWord2': hex_md5(password2)
    }, function (req) {
        if (req.code == '0000') {
            $.alertMsg('您的密码已重置，请重新登录', true, 1000);

            setTimeout(function () {
                loginObj.goBack = function () {
                    userCenterObj.show(true);
                };
                loginObj.show(true);
            }, 1000);

        } else {
            $.alertMsg(req.code_str || req.msg);
        }
    }, function () {
    })
}

findPwdObj.getSmsCode = function () {
    var $s = findPwdObj.getSmsCodeObj;

    if ($s.hasClass('alreadysend')) return;

    var phone = $('#findPwd_phone').val();
    if (phone.length == 0) {$.alertMsg('请先填写手机号码'); return false;}
    if (!/^1\d{10}$/g.test(phone)) {$.alertMsg('手机号码格式错误'); return false;}

    $s.html('发送中');

    Global.post('?m=user.account.sendMobileCode', {phone: phone, summary: 'findPwd'}, function (req) {
        if (req.code == '0000') $.alertMsg('短信验证码发送成功', true);
        else $.alertMsg(req.code_str || req.msg);

        $s.html('120秒后再次发送');

        var i = 120;
        findPwdObj.msgCodeInterval = setInterval(function () {
            if (i == 0) {
                clearInterval(findPwdObj.msgCodeInterval);
                $s.removeClass('alreadysend').html('获取短信验证码');
                return;
            }
            $s.addClass('alreadysend').html(--i + '秒后再次发送');
        }, 1000);
    }, function () {});
}

findPwdObj.setData = function (obj) {}

findPwdObj.onloadExecution = function () {
    this.createDomObj();
    this.createEvent();
}

findPwdObj.init = function () {
    findPwdObj.setDefConfig();
    findPwdObj.onloadExecution();
}

findPwdObj.setDefConfig = function () {
    findPwdObj.defSetTime = 120;
    findPwdObj.setTime = 120;
    if (findPwdObj.msgCodeInterval) {
        clearTimeout(findPwdObj.msgCodeInterval);
        findPwdObj.msgCodeInterval = '';
    }
    this.realInfo = {};
    this.userName = '';
    this.type = '';
}


