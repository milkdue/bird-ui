/*
 * @Author: 可以清心
 * @Description: 节流和防抖工具
 * @Date: 2024-01-25 16:33:25
 * @LastEditTime: 2024-01-31 18:13:43
 */
function debounce(fn, wait) {
    let timer = null;

    return function() {
        if (timer !== null) {
            clearTimeout(timer);
        }

        timer = setTimeout(fn, wait);
    };
}

function throttle(fn, delay = 1000) {
    let timer = null;
    let result = null;

    return function(...args) {
        if (timer) {
            return result;
        }

        timer = setTimeout(() => {
            timer = null;
            result = fn.apply(this, args);
        }, delay);

        return result;
    };
}

export { debounce, throttle };
