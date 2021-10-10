export function validUsername(str) {
	const valid_map = ['fbn_admin', 'editor']
	return valid_map.indexOf(str.trim()) >= 0
}
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export const validatorUserName = (rule, value, callback) => {
	if (!value || !value.trim()) {
		return callback(new Error('用户名不能为空'))
	}
	callback()
}

export const validatorUserIphone = (rule, value, callback) => {
	var str = /^1[3-9]\d{9}$/
	if (!str.test(value)) {
		return callback(new Error('手机号输入不正确'))
	}
	callback()
}

export const validEmail = (rule, value, callback) => {
	if (
		value.match('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$')
	) {
		callback()
	} else {
		return callback(new Error('邮箱输入不正确'))
	}
	callback()
}

export const checkUploadImage = e => {
	if (!e) return
	let name = e.substring(e.lastIndexOf('.') + 1, e.length)
	let uploadFormat = [
		'png',
		'jpg',
		'jpeg',
		'pdf',
		'svg',
		'svgz',
		'pjp',
		'jff',
		'ico',
		'tif',
		'xbm',
		'pjpeg',
		'bmp',
		'tiff',
		'avif',
		'dib',
		'webp',
	]
	if (uploadFormat.includes(name)) {
		return true
	}
	return false
}

export const validtime = (rule, value, callback) => {
	console.log(value)
	callback()
}

export const toKeys = (Ob, isKey) => {
	if (Ob && Ob.length < 1) return []
	let newOb = []
	let ind = 0
	for (const i in Ob) {
		newOb[ind] = {
			value: isKey ? Ob[i] : parseInt(i),
			label: Ob[i],
		}
		ind = ind + 1
	}
	return newOb
}
export const getQueryVariable = variable => {
	var query = window.location.hash.substring(
		window.location.hash.lastIndexOf('#') + 1,
		window.location.hash.length,
	)
	var vars = query.split('&')
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=')
		if (pair[0] == variable) {
			return pair[1]
		}
	}
	return false
}

export const getValue = (arr, val) => {
	//数组 数字（key值）
	let nowVal
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].value == val) {
			nowVal = arr[i].value
			break
		}
	}
	return nowVal
}
let timeout = null
export const debounce = (fn, wait) => {
	if (timeout !== null) clearTimeout(timeout)
	timeout = setTimeout(fn, wait)
}

export const dateFormat = (date, format) => {
	date = new Date(date)
	date.setHours(date.getHours())
	var o = {
		'M+': date.getMonth() + 1, //month
		'd+': date.getDate(), //day
		'H+': date.getHours(), //hour
		'm+': date.getMinutes(), //minute
		's+': date.getSeconds(), //second
		'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
		S: date.getMilliseconds(), //millisecond
	}

	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))

	for (var k in o)
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
			)
		}
	return format
}

export const isCardNo = (rule, value, callback) => {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
	if (reg.test(value)) {
		callback()
	} else {
		return callback(new Error('身份证输入不正确'))
	}
	callback()
}
