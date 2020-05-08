new Vue({
  el: '#app',
  data: function () {
    return {
      userId: '',             //请求数据的userId
      expertId: '',           //请求数据的专家id
      baseUrl: 'http://192.168.1.167:8080/api/school',
      loading: true,
      content: '',            //输入框内容
      recordList: []
    }
  },
  mounted() {
    const _this = this;
    if (!this.getUrlParam('userId') || !this.getUrlParam('expertId')) {
      this.$message.error('获取不到用户信息，请返回页面重试');
      return false
    }
    _this.userId = _this.getUrlParam('userId');
    _this.expertId = _this.getUrlParam('expertId');
    _this.initList();
  },
  methods: {
    getUrlParam (name) {
			// 校验地址栏中是否拥有code参数
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
			var r = window.location.search.substr(1).match(reg)
			if (r != null) return unescape(r[2])
			return null
    },
    initList() {
      // 获取聊天记录
      const _this = this;
      $.ajax({
        type: "POST",
        url: `${this.baseUrl}/recordExpert`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          userId: _this.userId,
          expertId: _this.expertId
        }),
        success: function(res){
          _this.loading = false;
          if (res.code !== 0) {
            _this.$message.error(res.msg);
            return false;
          }
          _this.recordList = res.data
        },
        error: function(jqXHR){
          console.log(jqXHR)
        }
      })
    },
    handleSend() {
      // 发送聊天记录
      const _this = this;
      if (_this.content === "") {
        this.$message({
          message: '不能发送空消息',
          type: 'warning'
        });
        return false;
      }
      $.ajax({
        type: "POST",
        url: `${this.baseUrl}/sendToExpert`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          userId: _this.userId,
          expertId: _this.expertId,
          content: _this.content,
          type: '1'
        }),
        success: function(res){
          _this.loading = false;
          if (res.code !== 0) {
            _this.$message.error(res.msg);
            return false;
          }
          _this.content = '';
          _this.initList();
        },
        error: function(jqXHR){
          console.log(jqXHR)
        }
      })
    }
  }
})