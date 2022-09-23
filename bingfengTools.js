// ==UserScript==
// @name         冰楓綜合工具
// @namespace    bingfengTools
// @version      1.0
// @description  幫助你自動閱讀隱藏文吧！
// @author       Relaxing
// @match        https://bingfeng.tw/thread*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    console.log("Edit By Relaxing")
    var responseText = null; //網頁文本
    var parser = new DOMParser(); //解析器
    var doc = null;
    var NextURL = null; //下一步的URL



    window.addEventListener('load', function () {//在網頁加載完成執行
        const $list = document.getElementById('Info');
        // $list.addEventListener('click', (e) => { //本來想寫按下解鎖隱藏文才執行的 但網頁重定向問題未解決 未來再看看怎麼搞

        // })
        var unlock_hide_url = $list.href
        console.log($list.href); //解鎖文章的url
        Unlocked_article(unlock_hide_url)



        function Unlocked_article(unlock_strat_url) {
            //開始發送post請求
            GM_xmlhttpRequest({
                method: "GET",
                url: unlock_strat_url,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
                },
                onload: function (response) {
                    //document.getElementById("myDiv").innerHTML = response.responseText;
                    responseText = response.responseText
                    parser = new DOMParser();
                    doc = parser.parseFromString(responseText, "text/html");
                    NextURL = doc.querySelector('#messagetext > div:nth-child(2) > div > div:nth-child(4) > a').href;
                    console.log("第一步網址:", NextURL)

                    GM_xmlhttpRequest({
                        method: "GET",
                        url: NextURL,
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
                        },
                        onload: function (response) {
                            //document.getElementById("myDiv").innerHTML = response.responseText;
                            responseText = response.responseText
                            parser = new DOMParser();
                            doc = parser.parseFromString(responseText, "text/html");
                            NextURL = doc.querySelector('#data-ad').href;
                            console.log("第二步網址", NextURL)
                            //querySelector('#amd02 > div > a').href
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: NextURL,
                                headers: {
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
                                },
                                onload: function (response) {
                                    responseText = response.responseText
                                    parser = new DOMParser();
                                    doc = parser.parseFromString(responseText, "text/html");
                                    NextURL = doc.querySelector('#amd02 > div > a').href;
                                    console.log("第三步網址:", NextURL)
                                    GM_xmlhttpRequest({
                                        method: "GET",
                                        url: NextURL,
                                        headers: {
                                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
                                        },
                                        onload: function (response) {
                                            console.log("成功解鎖!")
                                            document.location.reload()

                                        }
                                    })

                                }
                            })
                        }
                    })
                }



            })
        }
        function auto_anwser() { //自動答題 未來製作
            //document.querySelector('#baduowabao_d857ee28 > div > canvas').click() 蛋的選擇器

        }


        //debugger



        // 
        // if(Unlock_hide != null){
        //     var url = Unlock_hide.href
        //     console.log("检测到网页可以解锁",url)
        // }else{
        //     console.log("该网页不可解锁")
        // }
    });

})();