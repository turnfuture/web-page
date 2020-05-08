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
          name: "你有给孩子自由做主的时间了吗？",
        },
        {
          property: "sonAb",
          name: "你为孩子付出的是不是孩子所需要的？",
        },
        {
          property: "sonAc",
          name: "你的孩子有时间观念吗？",
        },
        {
          property: "sonAd",
          name: "孩子做事情磨蹭拖拉吗？",
        },
        {
          property: "sonAe",
          name: "孩子经常玩手机或者电子游戏吗？",
        },
        {
          property: "sonAf",
          name: "孩子经常为父母做事吗？",
        },
        {
          property: "sonAg",
          name: "你的孩子总是索要物质奖励吗？",
        },
        {
          property: "sonAh",
          name: "你的孩子总是乱花钱吗？",
        },
        {
          property: "sonAi",
          name: "你的孩子能做到\"自己的事情自己做\"吗？",
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
          name: "你认为升学是孩子的唯一出路吗？",
        },
        {
          property: "sonAp",
          name: "你让孩子做取的好成绩的保证了吗？",
        },
        {
          property: "sonAq",
          name: "你认为目前孩子文化课学习是最重要的？",
        },
        {
          property: "sonAr",
          name: "孩子主动找过老师谈心吗？",
        },
        {
          property: "sonAs",
          name: "你在孩子回家后先关心的是学习问题吗？",
        },
        {
          property: "sonAt",
          name: "你认为你的孩子有责任心吗？",
        },
        {
          property: "sonAu",
          name: "你的孩子敢于承认错误吗？知错就改吗？",
        },
        {
          property: "sonAv",
          name: "遇到问题的时候，孩子主动思考吗？",
        },
        {
          property: "sonAw",
          name: "你的孩子有想赢怕输的心态吗？",
        },
        {
          property: "sonAx",
          name: "孩子遇到问题的时候情绪好吗？",
        },
        {
          property: "sonAy",
          name: "你的孩子常常发脾气吗？爱哭吗？",
        },
        {
          property: "sonAz",
          name: "你的孩子是不是个非常自信的孩子？",
        },
        {
          property: "sonBa",
          name: "你的孩子上进心强吗？",
        },
        {
          property: "sonBb",
          name: "孩子是不是总是和自己差的孩子比？",
        },
        {
          property: "sonBc",
          name: "你的孩子善于表达吗？",
        },
        {
          property: "sonBd",
          name: "你的孩子经常撒谎吗？",
        },
        {
          property: "sonBe",
          name: "你是否赞同孩子有异性朋友？",
        },
        {
          property: "sonBf",
          name: "你善于接受孩子的意见吗？",
        },
        {
          property: "sonBg",
          name: "你是否跟孩子讲过青春期生理知识？",
        },
        {
          property: "sonBh",
          name: "你会允许甚至保护孩子的隐私吗？",
        },
        {
          property: "sonBi",
          name: "孩子的同学们如何评价你的孩子？",
        },
        {
          property: "sonBj",
          name: "老师们普遍如何评价你的孩子？",
        },
        {
          property: "sonBk",
          name: "你怎么客观评价你的孩子？",
        },
        {
          property: "sonBl",
          name: "爱人怎么评价孩子？",
        },
        {
          property: "sonBm",
          name: "你的家庭气氛整体上怎么样？",
        },
        {
          property: "sonBn",
          name: "夫妻沟通是否顺畅？",
        },
        {
          property: "sonBo",
          name: "孩子总是和你顶嘴吗？",
        },
        {
          property: "sonBp",
          name: "孩子和你说心里话吗？",
        },
        {
          property: "sonBq",
          name: "你的孩子整体上逆反家长吗？",
        },
        {
          property: "sonBr",
          name: "你觉得你的孩子生活的快乐幸福吗？",
        },
        {
          property: "sonBs",
          name: "你和爱人教育孩子能保持一致吗？",
        }
      ],
      ratyList: [
        [
          "总是",
          "常常",
          "有时",
          "偶尔",
          "从不"
        ],
        [
          "总是",
          "常常",
          "有时",
          "不是",
          "完全不是"
        ],
        [
          "很强",
          "有",
          "一般",
          "不强",
          "很差"
        ],
        [
          "从不",
          "偶尔",
          "有时",
          "总是",
          "特别"
        ],
        [
          "从不",
          "偶尔",
          "有时",
          "常常",
          "总是"
        ],
        [
          "总能",
          "能",
          "一般",
          "偶尔能",
          "不能"
        ],
        [
          "优秀",
          "良好",
          "可以接受",
          "有待改进",
          "无法忍受"
        ],
        [
          "优秀",
          "良好",
          "一般",
          "有待改进",
          "很差"
        ],
        [
          "很快乐",
          "快乐",
          "一般",
          "苦",
          "很痛苦"
        ],
        [
          "很好",
          "不错",
          "一般",
          "较差",
          "很差"
        ],
        [
          "十分认同",
          "认同",
          "一般",
          "不认同",
          "完全不认同"
        ],
        [
          "非常有",
          "有",
          "一般",
          "偶尔有",
          "完全没有"
        ],
        [
          "没有",
          "有时有",
          "有一些",
          "常常",
          "很严重"
        ],
        [
          "非常",
          "很",
          "一般",
          "不自信",
          "很不"
        ],
        [
          "非常",
          "很强",
          "一般",
          "不上进",
          "很不"
        ],
        [
          "非常赞同",
          "赞同",
          "一般",
          "不赞同",
          "禁止"
        ],
        [
          "优秀",
          "良好",
          "一般",
          "有待改进",
          "无法忍受"
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
          type: '2',
          id
        }),
        success: function(res){
          if (res.code !== 0) {
            _this.$message.error(res.msg);
            return false
          }
          const data = res.data;
          data.studentReviewDO.zc = data.studentReviewDO.zc.split("");
          data.studentReviewDO.zg = data.studentReviewDO.zg.split("");
          data.studentReviewDO.zm = data.studentReviewDO.zm.split("");
          data.studentReviewDO.zn = data.studentReviewDO.zn.split("");
          data.studentReviewDO.zo = data.studentReviewDO.zo.split("");
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