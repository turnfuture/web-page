/**
 * 校验地址栏中是否存在code值
 * 存在说明已经授权过了，没有code值则说明没有授权
 */
let baseUrl = 'http://fensuiji.hnxn888.com/api/order',
    memberId = '';
let wxCode = (function(){
    let url = encodeURIComponent(location.href);
    if (!getUrlParam('code')) {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05cc8406b89f1452&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
    	return false;
    }
    return getUrlParam('code');
}());

$(function() {
    if (!wxCode) {
        return false;
    }
    $.ajax({
    	url: `${baseUrl}/user/getUserInfo`,
    	type: 'POST',
        async: false,
    	contentType: "application/json",
    	data: JSON.stringify({
    		code: wxCode
    	}),
    	dataType: "json",
    	success: (res) => {
            if(res.code !== 0) {
                mui.toast('授权失败，请重新登录！');
                return false;
            }
    		memberId = res.data;
            init(res.data);
    	}
    });
})

function init(memberId) {
    $.ajax({
    	url: `${baseUrl}/order/orderList`,
    	type: 'POST',
        async: false,
    	contentType: "application/json",
    	data: JSON.stringify({
    		memberId: memberId
    	}),
    	dataType: "json",
    	success: (res) => {
            if(res.code !== 0) {
                mui.toast('获取订单失败');
                return false;
            }
            let tempLi = "",
                data = res.data;
            if (data.length === 0) {
                let str = '<div class="nothing">暂无订单处于此流程</div>';
                $(".tab_bottom").html(str);
                return false;
            }
            for (let i = 0, len = data.length; i < len; i++) {
    			tempLi += `<li>
    							<div class="orders">
    								<div class="top">
    									<div>订单号: <span>${data[i].orderNo}</span></div>
    									<div>${data[i].goodsNo}</div>
    								</div>
    								<div class="bottom">
    									<div class="lift">
    										<img src="${data[i].orderType === 0 ? `${data[i].positiveImg}` : `${data[i].sceneImg}`}" >
    									</div>
    									<div class="right">
    										<p>${data[i].goodsName}</p>
    										<p>${data[i].orderType === 0 ? '申请安装' : '申请维修'}</p>
    										<p>地址: <span>${data[i].city}${data[i].address}</span></p>
    									</div>
                                        <button onclick="lookDetails('.details-${data[i].id}', '.down-arrow-${data[i].id}')">
                                            查看详细
                                            <span class="down-arrow down-arrow-${data[i].id}"></span>
                                        </button>
    								</div>
                                    <div class="order-details details-${data[i].id}">
                                        <h3>基本信息</h3>
                                        <p>姓名：${data[i].name}</p>
                                        <p>手机号：<a href="tel:${data[i].phone}">${data[i].phone}</a></p>
                                        ${data[i].phone2 ? `<p>备用联系人：${data[i].phone2}</p>` : ''}
                                        <h3>商品信息</h3>
                                        <p>购买渠道：${data[i].buyTupe}</p>
                                        ${data[i].orderType === 0 ? 
                                            `<h3>水槽信息</h3>
                                            <p>水槽是否已经安装完成：${data[i].waterTank === 0 ? '未安装' : '已安装'}</p>
                                            <p>龙头是否已经安装完成：${data[i].waterTap === 0 ? '未安装' : '已安装'}</p>
                                            <p>水槽下方是否有三项电源插座：${data[i].waterSocket === 0 ? '未安装' : '已安装'}</p>
                                            <p>是否需要连接洗碗机：${data[i].dishwasher === 0 ? '未安装' : '已安装'}</p>
                                            <p>水槽落水口口径：${data[i].waterUpSize}</p>
                                            <p>水槽下水管口径：${data[i].waterDownSize}</p>
                                            <p>备注：${data[i].remarks}</p>
                                            <h3>水槽底部照片</h3>
                                            <img src="${data[i].bottomImg}">`
                                            :
                                            `<h3>维修信息</h3>
                                            <p>保修原因：${data[i].repair}</p>
                                            <p>出现问题：${data[i].problem}</p>`
                                        }
                                    </div>
    							</div>
    						</li>`;
    		}
    		$(".tab_bottom").html(tempLi);
    	}
    });
}

function lookDetails(detailsClass, obj) {
    let display = $(detailsClass).css('display');
    if (display === 'none') {
        $(detailsClass).slideDown();
        $(obj).addClass('active');
    } else {
        $(detailsClass).slideUp();
        $(obj).removeClass('active');
    }
}
    

function getUrlParam (name) {
    // 校验地址栏中是否拥有code参数
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}