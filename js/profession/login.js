/**
 * @auther xubowei
 * 登录界面
 * */

(function () {
    let loginButton = $('.form button');                                                                                //获取登录按钮
    let message = $('.message');                                                                                        //获取显示错误信息的div

    loginButton.click(function () {                                                                                     //登录按钮添加点击事件
        let userName = getUserName();                                                                                   //获取用户名
        let password = getPassword();                                                                                   //获取密码
        let _data = JSON.stringify({userLoginName: userName,password: password});                                       //将用户名密码打包成json字符串，以便传入后端
        if(!userName){                                                                                                  //请求前判断
            showErrorMessage(message,"请输入用户名");
            return;
        }
        else if(!password){
            showErrorMessage(message,"请输入密码");
            return;
        }
        $.ajax({                                                                                                        //发起请求
            url: url + 'auth/login/student',
            type: "post",
            data: _data,
            contentType: "application/json",
            success: function (result) {
                if(!result.isSuccess){
                    showErrorMessage(message,result.Msg);
                    return;
                }

                let newTab=window.open('about:blank');
                newTab.location.href = result.Data;
            }
        })
    });
    /**
     * @author xubowei
     * 获取用户名*/
    function getUserName() {
        return $('.user').val();
    }
    /**
     * @author xubowei
     * 获取密码*/
    function getPassword() {
        return $('.password').val();
    }
    /**
     * @author xubowei
     * 显示错误信息*/
    function showErrorMessage(DOM,Msg) {
        DOM.html(Msg);
        DOM.show().delay(1000).fadeOut();
    }
})();


