var vm = new Vue({
	el: '#app',
	data: {
    baseUrl: 'http://server.fanked.com/api',		// 服务器域名
    classList: [],
    showContent: false
	},
	methods: {
		init () {
      // 获取店铺分类
      this.$indicator.open('加载中...');
			$.ajax({
				url: `${this.baseUrl}/userGoods/shopClass`,
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
					this.classList = res.data;
				}
			});
    },
    bindSelect (id, name) {
      // 返回上一个页面
      sessionStorage.setItem("classId", id);
      sessionStorage.setItem("className", name);
      window.history.go(-1);
    }
	},
	mounted () {
		this.init();
	}
})