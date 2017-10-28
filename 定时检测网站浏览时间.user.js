// ==UserScript==
// @name         定时检测网站浏览时间
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Elietio
// @match        *://*
// @match   http://*/*
// @match   https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
      //cookiename
        var c_name = "scantime";

        //设置提醒时间
        var maxTime =1*60*1000;
      //设置定时间隔
        var sTime=2*60*1000;
        //页面加载
        window.onload=function () {
            //读取cookie
            var scanTime=getCookie(c_name);
            //cookie已存在
            if (scanTime!=null&&scanTime!="")
            {}
            //cookie未设置
            else{
                //设置当前系统时间毫秒值
                var value = new Date().getTime();
                //存储到cookie中
                setCookie(c_name,value);
            }

        };

        //设置cookie，关闭浏览器后清除cookie
        function setCookie(c_name,value){
            var exdate=new Date();
        
            document.cookie=c_name+ "=" +escape(value);
        }

        //获取cookie
        function getCookie(c_name)
        {
            if (document.cookie.length>0)
            {
                var c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1)
                {
                    c_start=c_start + c_name.length+1;
                    var c_end=document.cookie.indexOf(";",c_start);
                    if (c_end==-1) c_end=document.cookie.length;
                    return unescape(document.cookie.substring(c_start,c_end));
                }
            }

        }

        //执行定时任务
        var count = window.setInterval(function (){
            //读取cookie
            var scanTime = getCookie(c_name);
            if (scanTime!=null&&scanTime!="")
            {
                //获取当前系统时间
                var nowTime = new Date().getTime();
                //查询间隔时间
                var spaceTime = nowTime-parseInt(scanTime);
                if (spaceTime>maxTime){
                    alert("您已经浏览该网站"+parseInt(spaceTime/60000)+"分钟了");
                }
            }

        },sTime);

})();