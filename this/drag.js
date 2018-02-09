var params = {
	left: 0,
	top: 0,
	curretX: 0,
	curretY: 0,
	flag: false
};

//获取相关CSS属性
var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
};


//拖拽的实现
//
var startDrag = function(bar, target, callback) {
	if (getCss(target, 'left') !== 'auto') {
		params.left = getCss(target, 'left');
	}

	if(getCss(target, "top") !== "auto"){
		params.top = getCss(target, "top");
	}

	//o是移动对象
	//
	bar.onmousedown = function(event) {
		params.flag = true;
		if(!event) {
			event = window.event;
			// 防止选择字
			bar.onselectstart = function() {
				return false;
			}
		}
		var e = event;
		params.curretX = e.clientX;
		params.curretY = e.clientY;
	}

	document.onmouseup = function() {
		params.flag = false;
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
	}
	document.onmousemove = function(event) {
		var e = event || window.event;

		if (params.flag) {
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.curretX, disY = nowY - params.curretY;
			target.style.left = parseInt(params.left) + disX + "px";
			target.style.top = parseInt(params.top) + disY + "px";

			if (typeof callback == "function") {
				callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
			}

			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
	}
}

var bar = document.getElementById('bar');
var box = document.getElementById('box');

startDrag(bar, box);