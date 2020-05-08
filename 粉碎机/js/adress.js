// window.onlode = function () {
//选择地区
var cityPicker = new mui.PopPicker({
	layer: 2
});
var _getParam = function(obj, param) {
	return obj[param] || '';
};
document.querySelector(".add_create_place").onclick = function() {
	var picker = new mui.PopPicker();
	cityPicker.setData(cityData3);
	cityPicker.show(function(items) {
		document.querySelector(".add_create_place").value = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text');
	})
}
//购买渠道选择
document.querySelector(".buy").onclick = function() {
	var picker = new mui.PopPicker();
	picker.setData([{
		value: '',
		text: '阿里巴巴'
	}, {
		value: '',
		text: '淘宝'
	}, {
		value: '',
		text: '京东'
	}, {
		value: '',
		text: '天猫'
	}, {
		value: '',
		text: '特约经销商'
	}, {
		value: '',
		text: '公司直销'
	}, {
		value: '',
		text: '经销商'
	}, {
		value: '',
		text: '国美电器'
	}, {
		value: '',
		text: '特约经销商'
	}, {
		value: '',
		text: '五星电器'
	}, ]);
	picker.show(function(selectItems) {
		document.querySelector(".buy").value = selectItems[0].text;
	})
}
//商品型号选择
// document.querySelector(".xinghao").onclick = function() {
// 	var picker = new mui.PopPicker();
// 	picker.setData([{
// 		value: '',
// 		text: 'FWD-3500'
// 	}, {
// 		value: '',
// 		text: 'FWD-5500'
// 	}, {
// 		value: '',
// 		text: 'FWD-6500'
// 	}, {
// 		value: '',
// 		text: 'FWD-6500S'
// 	}, {
// 		value: '',
// 		text: 'FWD-7500'
// 	}, {
// 		value: '',
// 		text: 'FWD-8500'
// 	}, {
// 		value: '',
// 		text: 'FWD-9500'
// 	}, {
// 		value: '',
// 		text: 'LS800-3903'
// 	}, 
// 	 ]);
// 	picker.show(function(selectItems) {
// 		document.querySelector(".xinghao").value = selectItems[0].text;
// 	})
// }
// 报修原因
document.querySelector(".reason").onclick = function() {
	var picker = new mui.PopPicker();
	picker.setData([{
		value: '',
		text: '卡转'
	}, {
		value: '',
		text: '漏水'
	}, {
		value: '',
		text: '有异响'
	}, {
		value: '',
		text: '缺/损配件'
	}, {
		value: '',
		text: '其他'
	},
	]);
	picker.show(function(selectItems) {
		document.querySelector(".reason").value = selectItems[0].text;
	})
}