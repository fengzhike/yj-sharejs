#  易嘉人系列产品分享及二维码生成sdk

## 安装及使用
##  nodejs

```
$ npm  install yj-sharejs
```

```
var  yjSharejs = require('yj-sharejs');
yjSharejs.getQrCode({
	qrCodeWrap:'#qrCode',
	qrContent:"你好啊",
	qrIco:'https://www.rrtimes.com/img/100/favicon.png'
})
yjSharejs.initWx({
	shareLink:'https://m.rrtimes.com',
        	shareTitle:'易嘉',
        	shareDec:'易嘉人',
        	shareImg:'https://www.rrtimes.com/img/100/favicon.png'
})
```

## html引入

先下载yjshare文件

```
<script src="./lib/yjshare.js"></script>
```

JS文件
```
yjSharejs.getQrCode({
	qrCodeWrap:'#qrCode',
	qrContent:"你好啊",
	qrIco:'https://www.rrtimes.com/img/100/favicon.png'
})
yjSharejs.initWx({
	shareLink:'https://m.rrtimes.com',
        	shareTitle:'易嘉',
        	shareDec:'易嘉人',
        	shareImg:'https://www.rrtimes.com/img/100/favicon.png'
})
```
### api
yjShareSdk 提供生成二维码和初始化微信skd的能力

* 生成二维码

getQrCode以json格式接收三个参数

|参数|类型|详解|
|:-|:-:|:-|
|qrCodeWrap|String|二维码生成位置，请传入document.querySelector支持的选择器|
|qrContent|String|二维码内容，比如：yj.rrtimes.com|
|qrIco|String|二维码中心图标|

* 初始化wxSdk
initWx以json格式接收四个参数

|参数|类型|详解|
|:-|:-:|:-|
|shareLink|String|分享url|
|shareTitle|String|微信分享title|
|shareDec|String|微信分享描述|
|shareImg|String|微信分享logo|
