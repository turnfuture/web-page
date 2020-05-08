function handlePrint() {
  $("#printhtml").jqprint();
}

new Vue({
  el: '#app',
  data: function () {
    return {
      id: '',            //请求数据的id
      baseUrl: 'http://192.168.1.167:8080/api/review',
      tableList: [
        {
          name: '你认为自己是个好家长吗？',
          property: 'ye'
        },
        {
          name: '你认为爱人是个好家长吗？',
          property: 'yg'
        },
        {
          name: '你认为你是个好爱人吗？',
          property: 'yi'
        },
        {
          name: '你认为你爱人是个好爱人吗？',
          property: 'yk'
        },
        {
          name: '孩子主要是谁在教育？',
          property: 'ym'
        },
        {
          name: '孩子小时候主要是谁在带？',
          property: 'yn'
        },
        {
          name: '请问你的孩子最喜欢做什么事情？',
          property: 'yo'
        },
        {
          name: '请问你的孩子最害怕的事情是什么？',
          property: 'yp'
        },
        {
          name: '除了物质以外，你孩子最想得到的是什么？',
          property: 'yq'
        },
        {
          name: '请问你孩子最喜欢和最讨厌的人是谁？',
          property: 'yrys'
        },
        {
          name: '你认为你的孩子生活的快乐吗？',
          property: 'yt'
        },
        {
          name: '请写出孩子的五个缺点',
          property: 'yu'
        },
        {
          name: '请写出孩子的五个优点',
          property: 'yv'
        }
      ],
      table2List: [{
          property: "sonAa",
          name: "请总体评价孩子的生活习惯怎么样？",
        },
        {
          property: "sonAb",
          name: "孩子上幼儿园拖拉墨迹吗？",
        },
        {
          property: "sonAc",
          name: "孩子是否自己吃饭、自己穿衣服？",
        },
        {
          property: "sonAd",
          name: "孩子是否愿意尝试新鲜的事物？",
        },
        {
          property: "sonAe",
          name: "孩子刷牙洗澡有情绪吗？",
        },
        {
          property: "sonAf",
          name: "孩子挑食吗？",
        },
        {
          property: "sonAg",
          name: "孩子是否经常吃零食？",
        },
        {
          property: "sonAh",
          name: "孩子吃饭过程中边吃边玩(看电视)吗？",
        },
        {
          property: "sonAi",
          name: "孩子是经常玩电脑、手机、打游戏吗？",
        },
        {
          property: "sonAj",
          name: "孩子常常要物质奖励吗？",
        },
        {
          property: "sonAk",
          name: "孩子在幼儿园表现你满意吗？",
        },
        {
          property: "sonAl",
          name: "孩子在幼儿园的自理问题你满意吗？",
        },
        {
          property: "sonAm",
          name: "孩子在幼儿园学习内容的掌握程度你满意吗？",
        },
        {
          property: "sonAn",
          name: "你对孩子的同伴交往满意吗？",
        },
        {
          property: "sonAo",
          name: "你对孩子表现力满意吗？",
        },
        {
          property: "sonAp",
          name: "孩子撒谎吗？",
        },
        {
          property: "sonAq",
          name: "孩子是不是总是和自己差的孩子比？",
        },
        {
          property: "sonAr",
          name: "孩子遇到错误敢于承担吗？",
        },
        {
          property: "sonAs",
          name: "孩子遇到问题或者困难时情绪好吗？",
        },
        {
          property: "sonAt",
          name: "你的孩子是非常自信的孩子吗？",
        },
        {
          property: "sonAu",
          name: "孩子能做到\"自己的事情自己做\"吗？",
        },
        {
          property: "sonAv",
          name: "遇到问题的时候，孩子能主动想办法吗？",
        },
        {
          property: "sonAw",
          name: "你的孩子有想赢怕输的心态吗？",
        },
        {
          property: "sonAx",
          name: "你的孩子常常发脾气吗？爱哭吗？",
        },
        {
          property: "sonAy",
          name: "孩子能遵守约定吗？",
        },
        {
          property: "sonAz",
          name: "孩子是否经常欺负同学或小伙伴？",
        },
        {
          property: "sonBa",
          name: "孩子是否经常被同学或小伙伴欺负？",
        },
        {
          property: "sonBb",
          name: "孩子的同学们如何评价你的孩子？",
        },
        {
          property: "sonBc",
          name: "老师们如何评价你的孩子？",
        },
        {
          property: "sonBd",
          name: "你怎么客观评价你的孩子？",
        },
        {
          property: "sonBe",
          name: "爱人怎么评价你们的孩子？",
        },
        {
          property: "sonBf",
          name: "你的家庭气氛整体上怎么样？",
        },
        {
          property: "sonBg",
          name: "夫妻沟通是否顺畅？",
        },
        {
          property: "sonBh",
          name: "夫妻面对孩子教育是否观点一致？",
        },
        {
          property: "sonBi",
          name: "孩子是否和父母交流幼儿园的事情？",
        },
        {
          property: "sonBj",
          name: "你的孩子整体上逆反家长吗？",
        },
        {
          property: "sonBk",
          name: "孩子总是和你顶嘴吗？",
        },
        {
          property: "sonBl",
          name: "你觉得你的孩子生活的快乐幸福吗？",
        },
        {
          property: "sonBm",
          name: "你经常和孩子睡一张床吗？",
        },
        {
          property: "sonBn",
          name: "你对配偶为家庭的付出满意吗？",
        },
        {
          property: "sonBo",
          name: "其他：",
        }
      ],
      ratyList: [
        [
          "优秀",
          "良好",
          "一般",
          "有待改进",
          "无法忍受"
        ],
        [
          "从不",
          "偶尔",
          "一般",
          "经常",
          "总是"
        ],
        [
          "总是",
          "经常",
          "一般",
          "偶尔",
          "从不"
        ],
        [
          "很满意",
          "满意",
          "一般",
          "不满意",
          "很不满意"
        ],
        [
          "很好",
          "不错",
          "一般",
          "较差",
          "很差"
        ],
        [
          "很好",
          "好",
          "一般",
          "不好",
          "非常不好"
        ],
        [
          "非常快乐",
          "快乐",
          "一般",
          "不快乐",
          "很不快乐"
        ],
        [
          "从不",
          "偶尔",
          "有时",
          "经常",
          "总是"
        ],
        [
          "总是",
          "经常",
          "有时",
          "偶尔",
          "从不"
        ]
      ],
      studentReviewDO: {},
      studentReviewResultDO: {}
    }
  },
  mounted() {
    if (!this.getUrlParam('id')) {
      this.$message.error('没有获取到id，返回后重试');
      return false
    }
    this.id = this.getUrlParam('id');
    this.init(this.getUrlParam('id'));
  },
  methods: {
    getUrlParam (name) {
			// 校验地址栏中是否拥有code参数
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
			var r = window.location.search.substr(1).match(reg)
			if (r != null) return unescape(r[2])
			return null
    },
    init(id) {
      const _this = this;
      $.ajax({
        type: "POST",
        url: `${this.baseUrl}/getReviewInfo`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          type: '0',
          id
        }),
        success: function(res){
          if (res.code !== 0) {
            _this.$message.error(res.msg);
            return false;
          }
          const data = res.data;
          data.studentReviewDO.zb = data.studentReviewDO.zb.split("");
          data.studentReviewDO.zs = data.studentReviewDO.zs.split("");
          data.studentReviewDO.zx = data.studentReviewDO.zx.toString().split("");
          data.studentReviewDO.zy = data.studentReviewDO.zy.toString().split("");
          data.studentReviewDO.zz = data.studentReviewDO.zz.toString().split("");
          data.studentReviewDO.yt = data.studentReviewDO.yt.toString().split("");
          _this.studentReviewDO = data.studentReviewDO;
          _this.studentReviewResultDO = data.studentReviewResultDO;
        },
        error: function(jqXHR){
          console.log(jqXHR)
        }
      })
    },
    resultSub() {
      const content = this.studentReviewResultDO.content;
      if (!content) {
        this.$message({
          message: '测评结果不能为空！',
          type: 'warning'
        });
        return false;
      }
      const _this = this;
      $.ajax({
        type: "POST",
        url: `${this.baseUrl}/saveReviewResult`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          userId: _this.studentReviewResultDO.userId,
          id: _this.studentReviewResultDO.id,
          reviewId: _this.studentReviewResultDO.reviewId,
          content: _this.studentReviewResultDO.content,
        }),
        success: function(res){
          if (res.code !== 0) {
            _this.$message.error(res.msg);
            return false;
          }
          _this.init(_this.id)
        }
      })
    }
  }
})