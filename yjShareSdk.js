import wx from 'weixin-js-sdk';
import QRCode from './qrcode.js'


const yjShareSdk = {
    _shareData:{ //微信分享用
        // shareLink:''
        // shareTitle:'',
        // shareDec:'',
        // shareImg:''
    },
    _qrCodeData:{//二维码
        // qrCodeWrap:'body',
        // qrContent:'',
        // qrIco:'',
    },
    initWx:function(shareData){
         var _this = yjShareSdk;
        _this._shareData = shareData
        _this.getJsSignInfo()
    },
    getQrCode:function(qrCodeData){
        var _this = yjShareSdk;

        _this._qrCodeData = qrCodeData
        var qrCodeEle = document.querySelector(_this._qrCodeData.qrCodeWrap)
        var qr2 = new QRCode(qrCodeEle,{
            width: 120,
            height: 120
        })
        qr2.makeCode(_this._qrCodeData.qrContent);

        if(_this._qrCodeData.qrIco){
            qrCodeEle.style.position = 'relative';
            var img = document.createElement('img')
            img.src = _this._qrCodeData.qrIco
            img.style = "position: absolute;top: 45px;left: 45px;border: 1px solid #fff;border-radius: 5px;background: #fff;"
            img.width = 30
            img.height = 30
            img.alt="Scan me!" 
            qrCodeEle.appendChild(img)
        }



    },
    getJsSignInfo:function(){
         var _this = yjShareSdk;
        _this.ajax({
            url:'v1/mobile/getJsSignInfo',
            type: "POST",
            data: { url:window.location.href.split('#')[0]},
            dataType: "json",
            success: function (response, xml) {
                debugger
                // todo
                __this.initWeixinJsSdk(JSON.parse(response).value.signInfo)
                //initWeixinJsSdk(ajaxData.value.signInfo,data)
            },
            fail: function (status) {
                // fail
            }
        });

    },

    initWeixinJsSdk:function (signInfo) {
         var _this = yjShareSdk;
        var host = window.location.host
            //"http://static.oschina.net/uploads/cooperation/question_banner_one_ioXRy.jpg";
        // if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
        //     host = 'dev.rrtimes.com:8088'
        // }

        var temp = {
                link: _this._shareData.shareLink || null,
                title:_this._shareData.shareTitle || null, // 分享标题
                desc:_this._shareData.shareDec || null, // 分享描述
                imgUrl:_this._shareData.shareImg || null// 分享图标
        }
            /*temp.share.link = window.location.origin + '/transmit.html?shareID='+shareID;*/ //window.location.href;
      /* if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger"){
            startweixin();
        }*/
        startweixin();
        function startweixin() {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
                appId: signInfo.appId, // 必填，公众号的唯一标识
                timestamp: signInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: signInfo.nonceStr, // 必填，生成签名的随机串
                signature: signInfo.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'/*, 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation'*/] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            var paramsTimeline = {
                title: temp.title, // 分享标题
                desc: temp.desc, // 分享描述
                link: temp.link, // 分享链接
                imgUrl: temp.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    //console.log(paramsTimeline)
                },
                cancel: function() {
                    //
                }
            };
            var paramsAppMessage = {
                title: temp.title, // 分享标题
                desc: temp.desc, // 分享描述
                link: temp.link, // 分享链接
                imgUrl: temp.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    //success
                    //console.log(paramsAppMessage)
                },
                cancel: function() {
                    //
                }
            };
            wx.ready(function() {

                wx.onMenuShareTimeline(paramsTimeline);
                wx.onMenuShareAppMessage(paramsAppMessage);

            });
        }
    },




    ajax: function (options) {
        var host = window.location.host
        // if(/localhost/.test(window.location.host) || /127.0.0.1/.test(window.location.host)){
        //     host = '192.168.1.202'
        // }
        options.url = window.location.protocol+'//'+host+'/'+options.url
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = JSON.stringify(options.data);
        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(params);
        }
    }

}

export default  yjShareSdk