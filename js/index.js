// top_menu滑过显示下拉菜单
;(function(window,document){
    var menu_list_box = document.getElementById('menu_list_box');
    var menu_list = document.getElementById('menu_list');
    var menu_list_son_box = menu_list_box.getElementsByTagName('div')[0];
    var menu_list_li = menu_list.getElementsByTagName('li');
    var menu_list_son = menu_list_son_box.getElementsByTagName('ul');
    var len = menu_list_son.length;

    menu_list_box.onmouseover = function (ev) {
        var ev = window.event || ev;
        var targetSource = ev.target || ev.srcElement;
        if (targetSource.getAttribute('data-index')) {
            for (var i = 0;i<len;i++){
                menu_list_son[i].style.display='none';
            }
            linerMove({obj:menu_list_son_box,attr:'height',targetPos:230,speedNum:20});
            var index = targetSource.getAttribute('data-index');
            menu_list_son[index].style.display='block';
        }
    };
    function leaveMenu(){
        linerMove({obj:menu_list_son_box,attr:'height',targetPos:0,speedNum:20});
        for (var i = 0;i<len;i++){
            menu_list_son[i].style.display='none';
        }
    }
    menu_list_box.onmouseleave = function () {
        leaveMenu();
    };
    menu_list_li[len].onmouseenter = menu_list_li[len+1]=function () {
        leaveMenu();
    }
})(window,document)

//shopping_cart购物车效果
;(function (window,document) {
    var shopping_cart = document.getElementById('shopping_cart');
    var shopping_cart_a = shopping_cart.getElementsByTagName('a')[0];
    var shopping_cart_div = shopping_cart.getElementsByTagName('div')[0];
    shopping_cart_a.onmouseenter = function () {
        allEaseMove({obj:shopping_cart_div,attrTarget:{height:98},speedNum:10});
    };
    shopping_cart_a.onmouseleave= function () {
        allEaseMove({obj:shopping_cart_div,attrTarget:{height:0},speedNum:10});
    }
})(window,document)

// seaech搜索框效果
;(function (window,document) {
    var search = document.getElementById('search');
    var div_ipt = search.getElementsByTagName('div')[0];
    var input_ipt = search.getElementsByTagName('input')[0];
    var submitBtn = search.getElementsByTagName('input')[1];
    var search_tuijian = search.getElementsByTagName('div')[1];
    var search_tuijian_pro = search_tuijian.getElementsByTagName('ul')[0];
    var user_search = search_tuijian.getElementsByTagName('p')[0];
        div_ipt.onclick = function () {
            div_ipt.style.display = 'none';
            input_ipt.style.display = 'inline-block';
            input_ipt.focus();
        };
        input_ipt.onfocus=function(){
            input_ipt.style.borderColor = submitBtn.style.borderColor = '#ff6700';
            search_tuijian.style.display = 'block';
        };
        input_ipt.onkeyup= function(){
            search_tuijian_pro.style.display = 'none';
            user_search.style.display='block';
            user_search.innerHTML = '<span>'+this.value+'</span><b>约有'+Math.round(Math.random()*20)+'件</b>';
            if (this.value==''){
                user_search.style.display='none';
                search_tuijian_pro.style.display = 'block';
            }
        };
        input_ipt.onblur = function () {
          if (this.value==''){
              div_ipt.style.display = 'inline-block';
              input_ipt.style.display =  'none';
          }
          input_ipt.style.borderColor = submitBtn.style.borderColor = '#e0e0e0';
            search_tuijian.style.display = 'none';
        }

})(window,document)

// banner_menu滑过显示右侧菜单
;(function (window,document) {
    var banner_menu = document.getElementById('banner_menu');
    var banner_menu_li = banner_menu.getElementsByTagName('li');
    var len = banner_menu_li.length;
    for (var i =0;i<len;i++){
        banner_menu_li[i].index = i;
        banner_menu_li[i].onmouseover = function () {
            var li_item = banner_menu_li[this.index];
            if (li_item.getAttribute('data-index')) {
                var banner_menu_li_div = li_item.getElementsByTagName('div')[0];
                var li_div_ul = banner_menu_li_div.getElementsByTagName('ul');
                var ul_len = li_div_ul.length;
                banner_menu_li_div.style.width =parseInt(getStyle(li_div_ul[0],'width'))*ul_len+'px';
                banner_menu_li_div.style.display='block';
            }
        }
        banner_menu_li[i].onmouseout = function () {
            var li_item = banner_menu_li[this.index];
            if (li_item.getAttribute('data-index')) {
                var li_item = banner_menu_li[this.index];
                var banner_menu_li_div = li_item.getElementsByTagName('div')[0];
                banner_menu_li_div.style.display='none';
            }
        }
    }
})(window,document)

//opcity图片切换效果
;(function (window,document) {
    var banner_box = document.getElementById('banner_box');
    var banner_pic_list =document.getElementById('banner_pic_list');
    var banner_pic_list_li = banner_pic_list.getElementsByTagName('li');
    var li_len = banner_pic_list_li.length;
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var banner_dots = document.getElementById('banner_dots');
    var index =0;
    //增加小圆点并初始化
    var dotsHtml ='';
    for (var i=0;i<li_len;i++){
        dotsHtml+='<li>'+(i+1)+'</li>';
    }
    banner_dots.innerHTML=dotsHtml;
    var banner_dots_li = banner_dots.getElementsByTagName('li');
    function changeImg() {
        for (var i = 0 ;i<li_len;i++){
            banner_dots_li[i].className ='';
            banner_pic_list_li[i].style.opacity=0;
            banner_pic_list_li[i].style.filter = 'alpha(opacity:0)';
            banner_pic_list_li[i].className = ''
        }
        banner_dots_li[index].className = 'active';
        banner_pic_list_li[index].className = 'active';
        allEaseMove({obj:banner_pic_list_li[index],attrTarget:{opacity:100},speedNum:40})
    }
    changeImg();
    // 图片切换
    for (var i = 0 ;i<li_len;i++){
        banner_dots_li[i].index = i;
        banner_dots_li[i].onclick = function () {
            index = this.index;
            changeImg();
        }
    }
    prev.onclick =function () {
        index--;
        if (index<0){
            index=li_len-1;
        }
        changeImg();
    };
    next.onclick =function () {
        index++;
        if (index == li_len){
            index=0;
        }
        changeImg();
    };

    // 定时器
    var timer=null;
    autoPlay();
    function autoPlay(){
        timer = setInterval(function () {
            index++;
            index= index%li_len;
            changeImg();
        },3000);
    }
    banner_box.onmouseenter = function () {
        clearInterval(timer);
    };
    banner_box.onmouseleave = function () {
        autoPlay();
    }

})(window,document)

//countDown倒计时效果
;(function (window,document) {
        var count_down = document.getElementById('count_down');
        var hTime = count_down.getElementsByTagName('h5')[0];
        var count_down_em = count_down.getElementsByTagName('em');
        var targetTime = '00 :00';
        hTime.innerHTML=targetTime+'场';
        var targetHours = parseInt(targetTime.substring(0,2));
        var targetMinutes =59;
        var targetSeconds = 60;
        countDown();
        function countDown() {
            targetHours = parseInt(targetTime.substring(0,2));
            var t = new Date();
            var hours = t.getHours();
            var minutes = t.getMinutes();
            var seconds = t.getSeconds();
            count_down_em[0].innerHTML=getZero(targetHours-1-hours);
            count_down_em[1].innerHTML=getZero(targetMinutes-minutes);
            count_down_em[2].innerHTML=getZero(targetSeconds-seconds);
        }
        clearInterval(timer);
        var timer = setInterval(function () {
            var t = new Date();
            var hours = t.getHours();
            var minutes = t.getMinutes();
            if ((count_down_em[0].innerHTML=='00')&&(count_down_em[1].innerHTML=='00')&&(count_down_em[2].innerHTML=='00')){
                targetTime=getZero(hours)-getZero(hours)%2+2+':00';
                hTime.innerHTML=(targetTime=='24:00') ? ('00:00场'):(targetTime +'场');
            }
            if ((hours>targetHours)||(hours==targetHours&&minutes>targetMinutes)){
                targetTime=getZero(hours)-getZero(hours)%2+2+':00';
                hTime.innerHTML=(targetTime=='24:00') ? ('00:00场'):(targetTime +'场');
            }
            countDown();
        },1000);

})(window,document)

// 回到顶部效果
;(function (window,document) {
    var go_top = document.getElementById('go_top');
    goTop(go_top);
    window.onscroll = function () {
        goTop(go_top);
    };
})(window,document)

//主内容第二部分商品内容切换 为你推荐部分商品内容切换
;(function (window,document) {
    changeContent('btn_box','part2_pro_box',4);
    changeContent('tuijian_title','part3_tuijian',5);
    function changeContent(btnBoxId,proBoxId,viewLiNum) {
        var btn_box = document.getElementById(btnBoxId);
        var btn_prev = btn_box.getElementsByTagName('i')[0];
        var btn_next = btn_box.getElementsByTagName('i')[1];
        var part2_pro_box = document.getElementById(proBoxId);
        var part2_pro_list = part2_pro_box.getElementsByTagName('ul')[0];
        var part2_pro_list_li = part2_pro_list.getElementsByTagName('li');
        var len = part2_pro_list_li.length;
        var imgMargin = parseInt(getStyle(part2_pro_list_li[0],'marginLeft'));
        var imgOffsetWidth=part2_pro_list_li[0].offsetWidth;
        var imgWidth= imgOffsetWidth+imgMargin;
        part2_pro_list.style.width=imgWidth*len+'px';
        var index =0;
        btn_prev.style.color='#e0e0e0';
        if (index ==len-viewLiNum){btn_next.style.color='#e0e0e0';}//判断商品个数是不是可见商品长度
        var num = len%viewLiNum;//判断总商品数是否等于可见商品的倍数
        btn_prev.onclick =function () {
            if (!(index==0)){
                btn_next.style.color='#b0b0b0';
                index==num ? index-=num:index-=viewLiNum;
                if (index==0){
                    btn_prev.style.color='#e0e0e0';
                }
                allEaseMove({obj:part2_pro_list,attrTarget:{left:-(index*imgWidth)},speedNum:10});
            }
        };
        btn_next.onclick =function () {
            if (!(index ==len-viewLiNum)){
                btn_prev.style.color='#b0b0b0';
                len-viewLiNum-index==num ? index+=num :index+=viewLiNum;
                if(index==len-viewLiNum){
                    btn_next.style.color='#e0e0e0';
                }
                allEaseMove({obj:part2_pro_list,attrTarget:{left:-(index*imgWidth)},speedNum:10});
            }
        };
        btnMouseEvent(btn_prev,0);
        btnMouseEvent(btn_next,len-viewLiNum);

        function btnMouseEvent(obj,num){
            obj.onmouseenter=function () {
                index==num ? obj.style.color = '#e0e0e0': obj.style.color='#ff6700';
            };
            obj.onmouseleave=function () {
                index==num ? obj.style.color = '#e0e0e0': obj.style.color='#b0b0b0';
            };
        }
    }
})(window,document)

//内容部分商品切换
;(function (window,document) {
    var part3_content_parent =document.getElementById('part3_content_parent');
    var content_box = part3_content_parent.getElementsByTagName('div');
    var len = content_box.length;
    for (var i=0;i<len;i++){
        changeContent(content_box[i])
    }
    function changeContent(obj) {
        var prev = obj.getElementsByTagName('em')[0];
        var next = obj.getElementsByTagName('em')[1];
        var content_pro_list = obj.getElementsByTagName('ul')[0];
        var content_pro_list_li = content_pro_list.getElementsByTagName('li');
        var content_dots = obj.getElementsByTagName('ul')[1];
        var len = content_pro_list_li.length;
        var index = 0;
        var li_width = parseInt(getStyle(content_pro_list_li[0],'width'))+parseInt(getStyle(content_pro_list_li[0],'padding').substring(4,6))*2 ;
        content_pro_list.style.width = li_width*len+'px';
        //页面初始化
        var dotsHtml ='';
        for (var i =0 ;i<len;i++){
            dotsHtml+='<li>'+(i+1)+'</li>';
        }
        content_dots.innerHTML=dotsHtml;
        var dots_li= content_dots.getElementsByTagName('li');
        var dots_li_width = parseInt(getStyle(dots_li[0],'width'))+parseInt(getStyle(dots_li[0],'margin').substring(4,6))*2 ;
        content_dots.style.marginLeft = -(dots_li_width*len)/2+'px';
        function changeImg() {
            for (var i = 0 ;i<len;i++){
                dots_li[i].className ='';
            }
            dots_li[index].className = 'active';
            allEaseMove({obj:content_pro_list,attrTarget:{left:-(index*li_width)},speedNum:10})
        }
        changeImg();
        for (var i = 0 ;i<len;i++){
            dots_li[i].index = i;
            dots_li[i].onclick = function () {
                index = this.index;
                changeImg();
            }
        }
        prev.onclick =function () {
            if (!(index==0)) {
                index--;
                changeImg();
            }
        };
        next.onclick =function () {
            if (!(index ==len-1)){
                index++;
                changeImg();
            }
        };
    }



})(window,document)

//家电 智能 搭配 配件 周边商品内容切换
;(function (window, document) {
    changeContent('title_menu1','part3_pro_list_box1');
    changeContent('title_menu2','part3_pro_list_box2');
    changeContent('title_menu3','part3_pro_list_box3');
    changeContent('title_menu4','part3_pro_list_box4');
    changeContent('title_menu5','part3_pro_list_box5');
    function changeContent(menuId,boxId){
        var title_menu = document.getElementById(menuId);
        var title_menu_li = title_menu.getElementsByTagName('li');
        var part3_pro_list = document.getElementById(boxId);
        var part3_pro_list_ul = part3_pro_list.getElementsByTagName('ul');
        var len = title_menu_li.length;
        var index =0;
        title_menu_li[index].className='active';
        part3_pro_list_ul[index].style.display='block';
        for (var i =0;i<len;i++){
            title_menu_li[i].index = i;
            title_menu_li[i].onmouseover = function () {
                for(var i=0;i<len;i++){
                    part3_pro_list_ul[i].style.display='none';
                    title_menu_li[i].className='';
                }
                title_menu_li[this.index].className='active';
                part3_pro_list_ul[this.index].style.display='block';
            }
        }
    }


})(window,document);
