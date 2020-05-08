var vm = new Vue({
	el: '#app',
	data: {
		baseUrl: 'http://server.fanked.com/api/member/h5',		// 服务器域名
        maxImgHeight: {
            maxHeight: '500px'
        },
        wechatHidden: false,
		topId: '',																					// 上级id
		code: ''																					// 请求用户id
	},
	methods: {
        init () {
            this.maxImgHeight.maxHeight = (window.innerHeight - 8.5 * 16) + 'px';
        },
        initUserInfo () {
        	// 微信公众号端授权登陆
        	$.ajax({
        		url: `${this.baseUrl}/getUserInfo`,
        		type: 'POST',
        		contentType: "application/json",
        		data: JSON.stringify({
        			code: this.code,
        			topId: this.topId || '',
        		}),
        		dataType: "json",
        		success: (res) => {
        			this.memberUserId = res.data;
        		}
        	});
        },
        download () {
            // 判断是否是微信浏览器
            var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
            if (is_weixin) {
                this.wechatHidden = true
            }
        },
        closeWechat () {
          // 关闭
          this.wechatHidden = false
        },
        getUrlParam (name) {
        	// 校验地址栏中是否拥有code参数
        	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        	var r = window.location.search.substr(1).match(reg)
        	if (r != null) return unescape(r[2])
        	return null
        }
    },
    mounted () {
        // let url = encodeURIComponent(location.href);
        // if (!this.getUrlParam('code')) {
        //     window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx88fa5facc65a3ead&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
        //     return false;
        // }
        this.topId = this.getUrlParam('topId');
        this.code = this.getUrlParam('code');
        this.init();
        this.initUserInfo();
    }
})