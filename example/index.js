window.onload = function(){
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
}
