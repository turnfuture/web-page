var vm = new Vue({
	el: '#app',
	data: {
    baseUrl: 'http://server.fanked.com/api',		// 服务器域名
    cityList: [],
		showContent: false,
		current: -1,
		englishList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
		"L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
		val: '',
		showSearch: false,	//显示搜索
		searchList: []
	},
	methods: {
		init () {
      // 获取城市列表
      this.$indicator.open('加载中...');
			$.ajax({
				url: `${this.baseUrl}/cms/city/list`,
				type: 'POST',
				contentType: "application/json",
				data: JSON.stringify({}),
				dataType: "json",
				success: (res) => {
          this.$indicator.close();
          this.showContent = true;
          if(res.code !== 0) {
            this.$toast('获取数据失败');
            return false;
          }
					this.cityList = res.data;
				}
			});
		},
		bindSearch () {
			console.log(this.val)
			if (this.val === "") {
				this.showSearch = false;
				return false;
			}
			this.showSearch = true;
			let searchList = [];
			 this.cityList.map(item => {
				item.city.map(itm => {
					if (itm.cityName.indexOf(this.val) !== -1) {
						searchList.push(itm)
					}
				})
			})
			console.log(searchList)
			this.searchList = searchList;
		},
		bindA (index, item) {
			// 点击右侧英文字母
			this.showSearch = false;
			this.val = "";
			this.current = index;
			this.$nextTick(() => {
				let scrollTop = $(`#${item}`)[0].offsetTop - 50;
				$('html,body').animate({
					scrollTop: `${scrollTop}px`
				}, 800);
			})
		},
    bindSelect (city, showName) {
      // 返回上一个页面
      sessionStorage.setItem("city", city);
      sessionStorage.setItem("showName", showName);
      window.history.go(-1);
    }
	},
	mounted () {
		this.init();
	}
})