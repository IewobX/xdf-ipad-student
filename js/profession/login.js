/**
 * @auther xubowei
 * 登录界面*/
(function () {
    let loginButton = $('.form button');
    loginButton.click(function () {
        let userName = getUserName();
        let password = getPassword();
        if(!userName){
            alert('请输入用户名!');
        }
        else if(!password){
            alert('请输入密码!');
        }

    })

})();



function getUserName() {
    return $('.user').val();
}
function getPassword() {
    return $('.password').val();
}