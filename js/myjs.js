function getStyle(ele,attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele,null)[attr];

}
//时间日期规格化
function getZero(n) {
    var n = n||0;
    return n<10 ?'0'+n :''+n;
}
//大小写转换09-17
function strCover(str ,flag){
    var newStr='';
    var len = str.length;
    if (flag == 0){
        newStr = str.toUpperCase();
    }else if(flag == 1){
        newStr = str.toLowerCase();
    }else if(flag == 2){
        newStr = str.substring(0,1).toUpperCase()+str.substring(1).toLowerCase();
    }else {
        throw new Error('输入的数字不合法，必须为0，1，2中的三个数');
    }
    return newStr;
}

//随机验证码09-18
function getCode() {
    var htmlStr = '';
    for (var i =0 ;i<len;i++){
        var numAt = Math.round(Math.random()*61);
        var codeRand =codeStr.charAt(numAt);
        if (htmlStr.indexOf(codeRand) == -1){
            htmlStr+=codeRand;
        } else {
            i--;
        }
    }
    return htmlStr;
}

//数组去重09-20
function getArr(arr) {
    for (var i = 0;i<arr.length;i++){
        for (var j =i+1 ;j<arr.length;j++){
            if (arr[i]==arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}

//获取地址栏用户提交数据
function strJson(str, stp1 ,stp2) {
    var arrDate = str.substring(1).split(stp1);
    var len = arrDate.length;
    var json = {};
    for (var i = 0;i<len;i++){
        var arrDate2 = arrDate[i].split(stp2);
        json[arrDate2[0]]=arrDate2[1];
    }
    return json;
}



//获取所有兄弟节点09-19
function siblingAll(ele) {
    var arr=[];
    var preli = ele.previousElementSibling || ele.previousSibling;
    while (preli&&preli.nodeType == 1){
        arr.push(preli);
        preli = preli.previousElementSibling || preli.previousSibling;
    }
    var nextli = ele.nextElementSibling || ele.nextSibling;
    while (nextli&&nextli.nodeType == 1){
        arr.push(nextli);
        nextli = nextli.nextElementSibling || nextli.nextSibling;
    }
    return arr;
}

//获取元素到页面的距离09-21
function topAndLeft(ele) {
    var position = {
        top:0,
        left:0,
    };

    while(ele){
        position.top +=ele.offsetTop;
        position.left +=ele.offsetLeft;
        ele = ele.offsetParent;
    }
    return position;
}
//事件监听09-25
function bind(ele,type,fn) {
    if (ele.addEventListener){
        ele.addEventListener(type,fn,false)
    } else {
        ele.attachEvent('on'+type,fn);
    }
}
//事件取消09-25
function unbind(ele,type,fn) {
    if (ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
    } else {
        ele.detachEvent('on'+type,fn);
    }
}
//阻止冒泡09-25
function cancelBubble(ev) {
    if (ev.stopPropagation){
        ev.stopPropagation()
    }else {
        ev.cancelBubble = true;
    }
}

//阻止事件的默认行为09-25
function preventDefault(ev) {
    if (ev.preventDefault){
        ev.preventDefault();
    } else {
        ev.returnValue = false;
    }
}

//滚轮事件09-25
function bindMouseScroll(ele,fnUp,fnDown){
    ele.onmousewheel = mouseScroll;
    if (ele.DOMMouseScorll){
        ele.addEventListener('DOMMouseScroll',mouseScroll,false);
    }
    function mouseScroll(ev) {
        var ev = window.event ||ev;
        var flag =true;//向上为True;
        if (ev.wheelDelta){
            flag = ev.wheelDelta>0 ? true:false;
        }else {
            flag = ev.detail<0 ? true:false;
        }
        if (flag){
                fnUp();
        }else {
            //box.style.height = box.offsetHeight+10+'px';
            fnDown();
        }
        preventDefault(ev);
    }
}


/*
滚动条09-25
var scrollMaxTop = scrollBox.clientHeight-scroll.offsetHeight;
function fn1() {
    scroll.style.top = T +'px';
    var scale = T/scrollMaxTop;
    var H = scale *contentMaxTop;
    content.style.top = -H + 'px';
}
bindScroll( scroll,scrollMaxTop,fn1)
*/
function bindScroll(ele,scrollMaxTop,fn){
    ele.onmousedown = function (ev) {
        var ev  = window.event ||  ev;
        var posY = ev.clientY - scroll.offsetTop;
        ele.setCapture && ele.setCapture();
        preventDefault(ev);
        document.onmousemove = function (ev) {
            var ev = window.event || ev;
            var T = ev.clientY - posY;
            if (T<=0){
                T =0;
            } else if (T>=scrollMaxTop) {
                T = scrollMaxTop;
            }
            fn();

        }
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup =null;
        }
    }
}

//匀速运动09-26
function linerMove(option,endFn) {
    var obj = option.obj;
    var attr = option.attr;
    var targetPos= option.targetPos;
    var speedNum = option.speedNum;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var curPos = parseInt(getStyle(obj,attr));
        var speed = targetPos>curPos ? speedNum : -speedNum;
        var newCur = curPos+speed;
        if (newCur>=targetPos && speed>0 || newCur<=targetPos && speed<0){
            newCur = targetPos;
            clearInterval(obj.timer);
            endFn && endFn();
        }
        obj.style[attr]=newCur + 'px';

    },30);
    function getStyle(ele,attr) {
        return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele,null)[attr];
    }
}


//多属性的缓冲运动09-26 http://www.superslide2.com
/*
btn1.onclick = function () {
    allEaseMove(option);
};
btn2.onclick = function () {
    allEaseMove(option2);
};
var option ={
    obj:box,
    attrTarget:{
        left:600
    }
};
var option2 ={
    obj:box1,
    attrTarget:{
        height:300,
        opacity:30

    }
};
*/
function allEaseMove(option,endFn) {
    var obj = option.obj;
    var attrTarget= option.attrTarget;
    var speedNum = option.speedNum;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in attrTarget) {
            if (attr == 'opacity'){
                var curPos = parseFloat(getStyle(obj,attr))*100;
            }else {
                var curPos = parseInt(getStyle(obj,attr));
            }
            var speed = (attrTarget[attr]-curPos)/speedNum;
            speed = attrTarget[attr]>curPos ? Math.ceil(speed) : Math.floor(speed);
            var newCur = curPos+speed;
            if(newCur!=attrTarget[attr]){
                flag =false;
            }
            if (attr == 'opacity'){
                obj.style[attr]=newCur/100;
                obj.style.filter = 'alpha(opacity='+ newCur +')';

            }else {
                obj.style[attr]=newCur + 'px';
            }
        }
        if (flag){
            clearInterval(obj.timer);
            endFn && endFn();
        }
    },30);
    function getStyle(ele,attr) {
        return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele,null)[attr];
    }
}

//cookie封装
function setCookie(name,value,time) {
    var date = new Date();
    date.setDate(date.getDate()+time);
    document.cookie=name+'='+value+';expires='+date;
}
function getCookie() {
    var str = document.cookie;
    var arrDate = str.split('; ');
    var len = arrDate.length;
    var json = {};
    for (var i = 0;i<len;i++){
        var arrDate2 = arrDate[i].split('=');
        json[arrDate2[0]]=arrDate2[1];
    }
    return json;
}
function removeCookie(name) {
    setCookie(name,'123',-1);
}

//ajax封装
function ajax(option) {
    var url = option.url;
    var successFn = option.successFn;
    var failFn = option.failFn;
    var dataType = option.dataType || 'text';
    dataType.toLowerCase();
    if (window.XMLHttpRequest){
        var ajax = new XMLHttpRequest();
    } else{
        var ajax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    ajax.open('get',url,true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4){
            if (ajax.status==200){
                if (dataType == 'text'){
                    successFn(ajax.responseText);
                } else if(dataType == 'xml'){
                    successFn(ajax.responseXML);
                }else if(dataType == 'json'){
                    successFn(JSON.parse(ajax.responseText));
                }

            } else {
                failFn&&failFn();
            }
        }

    }
}

//回到顶部
function goTop(obj){
    var viewH =document.documentElement.clientHeight;
    var scrTop = document.documentElement.scrollTop ||document.body.scrollTop;
    if (scrTop>viewH){
        obj.style.display='block';
    }else {
        obj.style.display='none';
    }
    obj.onclick = function () {
        document.documentElement.scrollTop=document.body.scrollTop=0;
    }
}