var _data = {};
_data.token = getCookie("token");
_data.url = window.location.href;
$.ajax({
    url : site_url+'/wx/getjssdk',
    data : _data,
    type : "GET",
    dataType : "JSON",
    success : function(obj){
        if(obj.code == 0){
            wx.config({
                debug: false,
                appId: obj.data.result.appId,
                timestamp: obj.data.result.timestamp,
                nonceStr: obj.data.result.nonceStr,
                signature: obj.data.result.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
            });

        }else{
            mui.toast(JSON.stringify(obj.msg));
        }
    }
});
var images = {
    localId: [],  // 每一次上传的图片Id 
    serverId: [0,1], // 累计的上传的图片serverId 初始化选项1 2 的
};

var chooseImg = function(item,index){
        wx.chooseImage({
            count : 1,
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
            	app.loadText = '正在上传';
	            app.maskShow = true;
                images.localId = res.localIds;
                item.isSpan = false;
                
                if(window.__wxjs_is_wkwebview) {
				   	wx.getLocalImgData({ //循环调用  getLocalImgData
				   		localId: images.localId[0], // 图片的localID
				   		success: function(res) {
				   			var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
				   			localData = localData.replace('jgp', 'jpeg'); //iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
				
                			app.imgs.splice(index,1,localData);
				   		},
				   		fail: function(res) {
				   			mui.toast(JSON.stringify(res));
				   			app.maskShow = false;
				   		}
				   	});
		         } else {
                	app.imgs.splice(index,1,images.localId[0]);
		        }
                
                upload_image(index);
            }
       });
}

var upload_image = function (index) {
        if (images.localId.length == 0) {
            mui.toast('请先使用 chooseImage 接口选择图片');
            return;
        }
        upload(index);
}

var upload = function(index){
    wx.uploadImage({
        localId: images.localId[0],
        isShowProgressTips : 0,
        success: function (res) {
            app.maskShow = false;
            images.serverId.splice(index,1,res.serverId);
        },
        fail: function (res) {
             mui.toast(JSON.stringify(res));
        }
    });
}


