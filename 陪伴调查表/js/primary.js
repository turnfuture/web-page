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
          name: "你的孩子有时间观念吗？",
        },
        {
          property: "sonAc",
          name: "早上起床到出门上学阶段表现怎么样？",
        },
        {
          property: "sonAd",
          name: "孩子做事情磨蹭拖拉吗？",
        },
        {
          property: "sonAe",
          name: "孩子在家中生活有规律吗？",
        },
        {
          property: "sonAf",
          name: "孩子在吃饭过程中是否有良好的习惯？",
        },
        {
          property: "sonAg",
          name: "孩子总是索要东西或乱花钱吗？",
        },
        {
          property: "sonAh",
          name: "孩子常常主动自觉做家务吗？",
        },
        {
          property: "sonAi",
          name: "孩子常常要物质奖励吗？",
        },
        {
          property: "sonAj",
          name: "请总体评价孩子的学习情况怎么样？",
        },
        {
          property: "sonAk",
          name: "你的孩子学习主动吗？",
        },
        {
          property: "sonAl",
          name: "孩子觉得学习苦吗？",
        },
        {
          property: "sonAm",
          name: "孩子写作业怎么样？",
        },
        {
          property: "sonAn",
          name: "孩子上课情况怎么样？",
        },
        {
          property: "sonAo",
          name: "你认为你的孩子学习认真吗？",
        },
        {
          property: "sonAp",
          name: "你孩子的学习成绩理想吗？",
        },
        {
          property: "sonAq",
          name: "你认为你的孩子有责任心吗？",
        },
        {
          property: "sonAr",
          name: "你的孩子能做到自己的事情自己做吗？",
        },
        {
          property: "sonAs",
          name: "你的孩子敢于承认错误吗？知错就改吗？",
        },
        {
          property: "sonAt",
          name: "遇到问题的时候，孩子主动思考吗？",
        },
        {
          property: "sonAu",
          name: "你的孩子有想赢怕输的心态吗？",
        },
        {
          property: "sonAv",
          name: "孩子遇到困难的时候情绪好吗？",
        },
        {
          property: "sonAw",
          name: "你的孩子常常发脾气吗？",
        },
        {
          property: "sonAx",
          name: "你的孩子是不是个非常自信的孩子？",
        },
        {
          property: "sonAy",
          name: "你的孩子上进心强么？",
        },
        {
          property: "sonAz",
          name: "孩子是不是总是和自己差的孩子比？",
        },
        {
          property: "sonBa",
          name: "你的孩子平时善于表达吗？",
        },
        {
          property: "sonBb",
          name: "孩子的同学们如何让评价你的孩子？",
        },
        {
          property: "sonBc",
          name: "老师们普遍如何评价你的孩子？",
        },
        {
          property: "sonBd",
          name: "你怎么客观评价你的孩子？",
        },
        {
          property: "sonBe",
          name: "爱人怎么评价孩子？",
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
          name: "孩子总是和你顶嘴吗？",
        },
        {
          property: "sonBi",
          name: "孩子和你说心里话吗？",
        },
        {
          property: "sonBj",
          name: "你的孩子整体上逆反家长吗？",
        },
        {
          property: "sonBk",
          name: "你觉得你的孩子生活的快乐幸福吗？",
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
          "非常有",
          "有",
          "一般",
          "偶尔",
          "很差"
        ],
        [
          "很好",
          "好",
          "一般",
          "有待改进",
          "很差"
        ],
        [
          "从不",
          "偶尔",
          "有时",
          "常常",
          "总是"
        ],
        [
          "总是",
          "常常",
          "有时",
          "偶尔",
          "从没"
        ],
        [
          "总是",
          "常常",
          "有时",
          "偶尔",
          "从不"
        ],
        [
          "优秀",
          "良好",
          "一般",
          "不好",
          "很不好"
        ],
        [
          "很快乐",
          "快乐",
          "一般",
          "苦",
          "很苦"
        ],
        [
          "非常好",
          "好",
          "一般",
          "较差",
          "很差"
        ],
        [
          "非常认真",
          "认真",
          "一般",
          "不认真",
          "很不认真"
        ],
        [
          "非常理想",
          "理想",
          "一般",
          "不理想",
          "很不理想"
        ],
        [
          "从没有",
          "偶尔有",
          "有时有",
          "常常有",
          "总是有"
        ],
        [
          "很好",
          "好",
          "一般",
          "不好",
          "很不好"
        ],
        [
          "非常强",
          "强",
          "有时",
          "偶尔",
          "从不"
        ],
        [
          "很善于",
          "善于",
          "有时",
          "偶尔",
          "从不"
        ],
        [
          "很好",
          "不错",
          "一般",
          "较差",
          "很差"
        ],
        [
          "很顺畅",
          "顺畅",
          "一般",
          "较差",
          "很差"
        ],
        [
          "很快乐",
          "快乐",
          "有时",
          "不快乐",
          "很不快乐"
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
          type: '1',
          id
        }),
        success: function(res){
          if (res.code !== 0) {
            _this.$message.error(res.msg);
            return false
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