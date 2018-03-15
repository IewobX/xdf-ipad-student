/**
 * Created by huangjiaroro on 2017/8/7.
 * 考试时用于接受学生操作动作通知的websocket
 */
var localUrlPath;
var webSocketPushMsg = null;
$(function () {
    localUrlPath = $("base").attr("href");
    localUrlPath = localUrlPath.substring(7);
});

//启动websocket 传入courseID和websocket类型，暂时只有一类 excam 表示考试
function startWebSocketServer(courseID, webSocketGenre) {
    // 判断对象是否创建
    if (webSocketPushMsg != null) {
        // 判断对象是否关闭
        var state = webSocketPushMsg.readyState;
        if (state == 1) { // 且已经打开
            showOkMessager("webSocket服务已经开启");
            return;
        }
    }

    // 创建WebSocket
    var url = "ws:" + localUrlPath + "websocket?webSocketGenre=" + webSocketGenre + "&courseID=" + courseID;
    if ('WebSocket' in window) {
        webSocketPushMsg = new WebSocket(url);
    } else if ('MozWebSocket' in window) {
        webSocketPushMsg = new MozWebSocket(url);
    } else {
        showErrorMessager("提示", "您的浏览器不支持websocket,请使用高版本浏览器或使用其他（火狐、谷歌）浏览器");
        return;
    }
    webSocketPushMsg.onopen = function () {
        // showOkMessager("已成功连接到远程服务!");
        console.log("已成功连接到远程服务!")
    };
    webSocketPushMsg.onmessage = function (event) {
        var _messages = event.data;
        var _messages = eval("(" + _messages + ")");
        displayMessage(_messages);
    };
    webSocketPushMsg.onclose = function () {
        reConnect(1, courseID, webSocketGenre);
        // showOkMessager("远程服务强行关闭了您的远程请求!");
    };
}

// 关闭服务
function closeServer() {
    webSocketPushMsg.close();
}

//心跳重连5次 断网处理 以及ngnix 代理websocket 60秒后自动断开的连接维持
function reConnect(count, courseID, webSocketGenre) {
    //重连5次未成功后则直接断开
    if (count > 5) {
        console.log("远程服务强行关闭了您的远程请求!");
        return
    }
    var state = webSocketPushMsg.readyState;
    if (state !== 1) {
        if (count <= 1) {
            startWebSocketServer(courseID, webSocketGenre)
        } else {
            //30秒重连一次
            setTimeout(function () {
                reConnect(count++, courseID, webSocketGenre)
            }, 30000)
        }

    }


}
