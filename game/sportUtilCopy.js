/**
 * Created by liqi .
 */
/**
 * Created by liqi .
 */

function move(element, attrMap, fn) {
    clearInterval(element.cl);
    element.cl = setInterval(function () {
        var flag = true;
        for (var a in attrMap) {
            var attr = a;
            var target = attrMap[a];
            var temp = Math.round(parseFloat(getStyle(element, attr)));
            var speed = Math.abs(target - temp) / (target - temp) * 10;
            if (target == temp) {
            } else {
                flag = false;
                element.style[attr] = temp + speed + "px";
            }

        }
        if (fn) {
            fn();
        }
        if (flag) {
            clearInterval(element.cl);
            alert("gameOver");
        }
    }, 80);
}
function getStyle(element, attr) {
    return getComputedStyle(element, null)[attr] || element.currentStyle[attr];

}
