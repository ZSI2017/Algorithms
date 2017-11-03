/**
 * Created by liqi on 2016/8/16.
 */
/**
 * .
 */

function move(element, attrMap, fn) {
	clearInterval(element.cl);
	element.cl = setInterval(function () {
		var flag = true;
		for (var a in attrMap) {
			var attr = a;
			var target = attrMap[a];
			var temp = Math.round(parseFloat(getStyle(element, attr)));
			var speed = Math.abs(target - temp) / (target - temp) * 4;
			if (target == temp) {} else {
				flag = false;
				element.style[attr] = temp + speed + "px";
			}

		}

		if (flag) {
			clearInterval(element.cl);
			if (fn) {
				fn();
			}
		}
	}, 10);
}

function getStyle(element, attr) {
	return getComputedStyle(element, null)[attr] || element.currentStyle[attr];

}
