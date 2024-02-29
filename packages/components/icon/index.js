/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-02-18 10:46:19
 * @LastEditTime: 2024-02-28 23:01:01
 */
import SvgIcon from "./src";
import "../../styles/icon/index.less";

const requireAll = r => r.keys().map(r);
// 加载目录下的所有的 svg 文件
requireAll(require.context("../../icons", true, /\.svg$/));

SvgIcon.install = function(Vue) {
    Vue.component(SvgIcon.name, SvgIcon);
};

export default SvgIcon;
