var marker;
var vm = new Vue({
	el: '#app',
	data: {
    baseUrl: 'http://server.fanked.com/api',		// 服务器域名
		longitude: "",
		latitude: "",
		address: "",
		val: "",
		showAmap: true,				//是否显示地图
		searchList: [],				//搜索数据
		details: ""
	},
	methods: {
		init () {
			let _this = this;
			// AMap.plugin('AMap.Geolocation', function() {
			// 	var geolocation = new AMap.Geolocation({
			// 		// 是否使用高精度定位，默认：true
			// 		enableHighAccuracy: true,
			// 		// 设置定位超时时间，默认：无穷大
			// 		timeout: 10000,
			// 		// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
			// 		buttonOffset: new AMap.Pixel(10, 20),
			// 		//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			// 		zoomToAccuracy: true,     
			// 		//  定位按钮的排放位置,  RB表示右下
			// 		buttonPosition: 'RB'
			// 	})
			
			// 	geolocation.getCurrentPosition()
			// 	AMap.event.addListener(geolocation, 'complete', onComplete)
			// 	AMap.event.addListener(geolocation, 'error', onError)
				
			// 	function onComplete (data) {
				// data是具体的定位信息
				map = new AMap.Map('container', {
					zoom: 16,		//级别
					resizeEnable: true,
					center: [113.665412,34.757975]
				})
				map.on('complete', function() {
					_this.$indicator.close();
				});
				//输入提示
				var auto = new AMap.Autocomplete({
					input: "tipinput"
				});
				// }
			
			// 	function onError (data) {
			// 		// 定位出错
			// 		alert(JSON.stringify(data))
			// 	}
			// })

			// 高德移动事件
			var geocoder = new AMap.Geocoder({
        city: "010", //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
    	});
			var logMapinfo = function (){
				var center = map.getCenter(); //获取当前地图中心坐标
				// 创建一个 Marker 实例：
				if (marker) {
					map.remove(marker);
				}
				marker = new AMap.Marker({
					position: center,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
					title: '郑州市'
				});
				
				// 将创建的点标记添加到已有的地图实例：
				map.add(marker);
				geocoder.getAddress(center, function(status, result) {
					if (status === 'complete'&&result.regeocode) {
						_this.longitude = center.toString().split(",")[0];
						_this.latitude = center.toString().split(",")[1];
						_this.address = result.regeocode.formattedAddress;
					}else{
						_this.$messagebox({
              title: '提示',
              message: '根据经纬度查询地址失败'
            })
					}
				});
			};
			// 事件绑定
			logMapinfo();
			map.on('moveend', logMapinfo);
		},
		search () {
			let _this = this;
			// 查询
			if (this.val === "") {
				this.showAmap = true;
				return false;
			}
			var geocoder = new AMap.Geocoder({});
    
    	marker = new AMap.Marker();
    
			geocoder.getLocation(this.val, function(status, result) {
				if (status === 'complete'&&result.geocodes.length) {
					var lnglat = result.geocodes[0].location
					marker.setPosition(lnglat);
					map.add(marker);
					map.setFitView(marker);
				}else{
					_this.$messagebox({
						title: '提示',
						message: '根据经纬度查询地址失败'
					})
				}
			});
		},
		submit () {
			if (!this.longitude || !this.latitude || !this.address) {
				this.$toast({
					message: '获取位置错误',
					position: 'bottom'
				});
				return false;
			}
			if (this.details === "") {
				this.$toast({
					message: '请输入详细信息',
					position: 'bottom'
				});
				return false;
			}
			// 返回上一个页面
			sessionStorage.setItem("longitude", this.longitude);
			sessionStorage.setItem("latitude", this.latitude);
			sessionStorage.setItem("address", this.address + this.details);
			window.history.go(-1);
		}
	},
	mounted () {
		this.init();
	},
	beforeCreate () {
		this.$indicator.open('加载中...');
	}
})

$(function () {
	$("body").on("click", ".auto-item", function() {
		vm.val = $(this).html().split("<span")[0];
		vm.search();
	})
})