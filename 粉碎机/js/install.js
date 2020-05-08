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
    	}
    });
    // 水槽正面照片
    $("#image").click(function() {
        $("#uploadfile").click();
    })
    $("#uploadfile").change(function() {
        var formData = new FormData();
        formData.append("file", $(this)[0].files[0]);
        $.ajax({
            url: `${baseUrl}/upload`,
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            success: (res) => {
                if(res.code !== 0) {
                    mui.toast('上传图片失败，请重新上传');
                    return false;
                }
                $("#image").attr('src', res.data) //将img标签的src绑定为DataURL
                $("#imgSrcOne").attr('value', res.data);
            }
        })
    })
    // 水槽底部照片
    $(".image").click(function() {
        $(".uploadfile").click();
    })
    $(".uploadfile").change(function() {
        var formData = new FormData();
        formData.append("file", $(this)[0].files[0]);
        $.ajax({
            url: `${baseUrl}/upload`,
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            success: (res) => {
                if(res.code !== 0) {
                    mui.toast('上传图片失败，请重新上传');
                    return false;
                }
                $(".image").attr('src', res.data)
                $("#imgSrcTwo").attr('value', res.data);
            }
        })
    })
    $("#service").submit(function(e) {
        e.preventDefault();
        let formArr = $(this).serializeArray(),
            subObj = {},
            tempArr = ['姓名', '手机号', '城市', '详细地址', '备用联系人', '购买渠道',
                    '订单编号', '商品名称', '商品型号', '', '', '', '', '水槽落水口口径', '水槽下水管口径', '备注', '水槽正面照片', '水槽底部照片'],
            myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        for (let i = 0, len = formArr.length; i < len; i++) {
            let tempMsg = formArr[i].value === '' ? `请输入${tempArr[i]}` : `请选择${tempArr[i]}`;
            if (formArr[i].name === "phone1") {
                continue;
            }
            if (formArr[i].value === '' || formArr[i].value === '请选择') {
                mui.toast(tempMsg);
                return false;
            }
            if (formArr[i].name === "phone" && !myreg.test(formArr[i].value)) {
                mui.toast('请输入正确的手机号码');
                return false;
            }
        }
        formArr.forEach((item) => {
            subObj[item['name']] = item['value'];
        })
        subObj.memberId = memberId;
        $.ajax({
        	url: `${baseUrl}/install/addInstall`,
        	type: 'POST',
        	contentType: "application/json",
        	data: JSON.stringify(subObj),
        	dataType: "json",
        	success: (res) => {
                if(res.code !== 0) {
                    mui.toast(res.msg);
                    return false;
                }
        		mui.toast('提交成功');
                setTimeout(function() {
                    location.reload();
                }, 1500);
        	}
        });
    })
})

window.addEventListener('load', function() {
    let switchList = document.getElementsByClassName('mui-switch-mini'),
        shuiSwitch = document.querySelectorAll('.shui-switch');
    for (let i = 0, len = switchList.length; i < len; i++) {
        switchList[i].addEventListener("toggle", function(event){
            shuiSwitch[i].value = event.detail.isActive ? 1 : 0;
        })
    }
})

function getUrlParam (name) {
    // 校验地址栏中是否拥有code参数
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}