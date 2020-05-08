var vm = new Vue({
	el: '#app',
	data: {
		baseUrl: 'http://server.fanked.com/api',		// 服务器域名
		code: '',																		// 请求用户code
		subFormData: {
			recommend: 1,
			img: 'img/addImg2.png',
			logo: 'img/addmg.png',
			shopName: '',
			name: '',
			phone: '',
			serverPhone: '',
			businessLicense: 'img/addImg2.png',
			classId: '',
			className: '',
			time: '',
			city: '',
			longitude: '',
			latitude: '',
			address: '',
			userName: '',
			password: '',
            rebate: '75%'
		},							//表单数据
        businessLicenses: [],
		pickerVisible: '09:00',
		count: 0,
		startTime: '',
		endTime: '',
        showName: '',           //显示选择的城市
		type: ""				//判断是否为业务员邀请还是商户邀请
	},
	methods: {
		initUserInfo () {
			$.ajax({
				url: `${this.baseUrl}/member/h5/getUserInfo`,
				type: 'POST',
				contentType: "application/json",
				data: JSON.stringify({
					code: this.code,
					topId: ""
				}),
				dataType: "json",
				success: (res) => {
					this.memberUserId = res.data;
				}
			});
		},
		upload (type, event) {
			// 上传图片
			this.$indicator.open('上传中...');
			var formData = new FormData();
        	formData.append("file", event.target.files[0]);
			$.ajax({
					url: `${this.baseUrl}/common/upload`,
					data: formData,
					type: 'POST',
					contentType: false,
					processData: false,
					success: (res) => {
						this.$indicator.close();
						if(res.code !== 0) {
							this.$toast('请重新上传');
							return false;
						}
                        // 店铺资料为多个图片,分开判断
                        if (type === 'businessLicense') {
                            this.businessLicenses.push(res.data);
                            this.subFormData[type] = this.businessLicenses.join(',');
                        } else {
                            this.subFormData[type] = res.data;
                        }
					}
			})
		},
        deleteImg (index) {
            // 删除店铺资料认证上传图片
            this.businessLicenses.splice(index, 1);
            this.subFormData['businessLicense'] = this.businessLicenses.join(',');
        },
		selectClass () {
			// 选择店铺分类
			sessionStorage.setItem("subFormData", JSON.stringify(this.subFormData));
			history.replaceState("subFormData", null, `addShop.html${location.search}`);
			location.href="selectClass.html";
		},
		selectCity () {
			// 选择店铺分类
			sessionStorage.setItem("subFormData", JSON.stringify(this.subFormData));
			history.replaceState("subFormData", null, `addShop.html${location.search}`);
			location.href="selectCity.html";
		},
		selectAddress () {
			// 选择店铺分类
			sessionStorage.setItem("subFormData", JSON.stringify(this.subFormData));
			history.replaceState("subFormData", null, `addShop.html${location.search}`);
			location.href="selectAddress.html";
		},
		openPicker () {
			this.count = 0;
			this.pickerVisible = "09:00";
			this.$refs.picker.open();
		},
		handleConfirm (value) {
			// 选择店铺营业时间
			this.count++;
			if (this.count === 1) {
				this.$refs.picker.close();
				setTimeout(() => {
					this.$refs.picker.open();
				}, 500)
				this.startTime = value;
				this.pickerVisible = "18:00";
			} else {
				this.$refs.picker.close();
				this.endTime = value;
				this.subFormData.time = this.startTime + '-' + this.endTime
			}
		},
		handleCancel () {
			this.$refs.picker.close();
		},
		submit () {
			// 提交表单
			let subFormData = this.subFormData,
					tempOj = {
						shopName: '请输入店铺名称',
						name: '请输入联系人姓名',
						phone: '请输入联系人手机号',
						serverPhone: '请输入客服电话',
						className: '请选择店铺分类',
						time: '请选择店铺营业时间',
						city: '请选择店铺所在地区',
						address: '请选择店铺位置',
						userName: '请输入店铺登录账号',
						password: '请输入店铺登录密码'
					},
					myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;;
			for (let prop in subFormData) {
				if (subFormData[prop] === 'img/addImg2.png' || subFormData[prop] === 'img/addmg.png') {
					this.$toast('请上传' + (prop === 'img' ? '店铺头像' : prop === 'logo' ? '封面图' : '店铺资质材料'));
					return false;
				}
				if (subFormData[prop] === "" && prop !== "classId") {
					this.$toast(tempOj[prop]);
					return false;
				}
				if (prop === "phone" && !myreg.test(subFormData[prop])) {
					this.$toast('请输入正确的手机号');
					return false;
				}
			}
			if (this.type === "shopId") {
				$.ajax({
					url: `${this.baseUrl}/shopUser/addShop`,
					type: 'POST',
					contentType: "application/json",
					data: JSON.stringify(this.subFormData),
					dataType: "json",
					success: (res) => {
						this.memberUserId = res.data;
						sessionStorage.clear();
						this.$toast('申请店铺成功');
						setTimeout(() => {
							window.open(`addShop.html${location.search}`, '_self')
						}, 1500)
					}
				});
			} else if (this.type === "staffId") {
				$.ajax({
					url: `${this.baseUrl}/Staff/addShop`,
					type: 'POST',
					contentType: "application/json",
					data: JSON.stringify(this.subFormData),
					dataType: "json",
					success: (res) => {
						this.memberUserId = res.data;
						sessionStorage.clear();
						this.$toast('申请店铺成功');
						setTimeout(() => {
							window.open(`addShop.html${location.search}`, '_self')
						}, 1500)
					}
				});
			} else {
				this.$toast('参数错误');
			}
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
		// 判断是否授权
		let url = encodeURIComponent(location.href);
		if (!this.getUrlParam('code')) {
			window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx88fa5facc65a3ead&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
			return false;
		}
		// 判断是否为跳转其它页面回来
		if (history.state === "subFormData") {
			if (JSON.parse(sessionStorage.getItem("subFormData"))) {
				this.subFormData = JSON.parse(sessionStorage.getItem("subFormData"));
				this.subFormData.classId = sessionStorage.getItem("classId") ? sessionStorage.getItem("classId") : '';
				this.subFormData.className = sessionStorage.getItem("className") ? sessionStorage.getItem("className") : '';
				this.subFormData.city = sessionStorage.getItem("city") ? sessionStorage.getItem("city") : '';
                this.showName = sessionStorage.getItem("showName") ? sessionStorage.getItem("showName") : '';
				this.subFormData.longitude = sessionStorage.getItem("longitude") ? sessionStorage.getItem("longitude") : '';
				this.subFormData.latitude = sessionStorage.getItem("latitude") ? sessionStorage.getItem("latitude") : '';
				this.subFormData.address = sessionStorage.getItem("address") ? sessionStorage.getItem("address") : '';
			}
		}
		this.code = this.getUrlParam('code');
		if (this.getUrlParam('shopId')) {
			this.subFormData.recommend = this.getUrlParam('shopId');
			this.type = "shopId";
		} else if (this.getUrlParam('staffId')) {
			this.subFormData.recommend = this.getUrlParam('staffId');
			this.type = "staffId";
		}
		this.initUserInfo();
	}
})