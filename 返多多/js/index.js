var vm = new Vue({
	el: '#app',
	data: {
		baseUrl: 'http://server.fanked.com/api',		// 服务器域名
		orderId: '',																				// 订单id
		topId: '',																					// 上级id
		code: '',																						// 请求用户id
		showContent: false,																	// 是否显示页面
		errorContent: false,																// 订单错误
		details: {},
		showZhuli: true,
		showSuccess: false
	},
	methods: {
		init () {
			// 初始化数据
			this.$indicator.open('加载中...');
			$.ajax({
				url: `${this.baseUrl}/order/h5/orderInfo`,
				type: 'POST',
				contentType: "application/json",
				data: JSON.stringify({
					orderId: this.orderId
				}),
				dataType: "json",
				success: (res) => {
					this.$indicator.close();
					if (res.code !== 0) {
						this.errorContent = true;
						return false;
					}
					this.showContent = true;
					this.details = res.data;
				}
			});
		},
		initUserInfo () {
			// 微信公众号端授权登陆
			$.ajax({
				url: `${this.baseUrl}/member/h5/getUserInfo`,
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
		bindZhuli () {
			// 助力
			$.ajax({
				url: `${this.baseUrl}/order/h5/orderHelp`,
				type: 'POST',
				contentType: "application/json",
				data: JSON.stringify({
					memberUserId: this.memberUserId,
					orderId: this.orderId
				}),
				dataType: "json",
				success: (res) => {
					if(res.code !== 0) {
							this.$toast('您已经助力过了！');
							return false;
					}
					if (res.msg === '你已经助力过了！'){
						this.$toast('您已经助力过了！');
					} else {
						this.$toast('助力成功');
						setTimeout(() => {
							this.showSuccess = true;
						}, 1500)
					}
				}
			});
		},
        cancel () {
            // 关闭弹框
            this.showSuccess = false;
            this.init();
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
		let url = encodeURIComponent(location.href);
		if (!this.getUrlParam('code')) {
			window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx88fa5facc65a3ead&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
			return false;
		}
		this.orderId = this.getUrlParam('orderId');
		this.topId = this.getUrlParam('topId');
		this.code = this.getUrlParam('code');
		this.init();
		this.initUserInfo();
	}
})