/**
 * @author xubowei
 * 强制横屏
 * */
let detectOrient = function() {
    let width = document.documentElement.clientWidth,
        height =  document.documentElement.clientHeight,
        $wrapper =  document.getElementsByTagName("html")[0],
        style = "";
    if( width >= height ){ // 横屏
        style += "width:" + width + "px;";  // 注意旋转后的宽高切换
        style += "height:" + height + "px;";
        style += "-webkit-transform: rotate(0); transform: rotate(0);";
        style += "-webkit-transform-origin: 0 0;";
        style += "transform-origin: 0 0;";
    }
    else{ // 竖屏
        style += "width:" + height + "px;";
        style += "height:" + width + "px;";
        style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
        // 注意旋转中点的处理
        style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
        style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
    }
    $wrapper.style.cssText = style;
};
window.onresize = detectOrient;
detectOrient();