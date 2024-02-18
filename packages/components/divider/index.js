/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-02-18 10:46:19
 * @LastEditTime: 2024-02-18 10:48:51
 */
import Divider from "./src";
import "../../styles/divider/index.less";

Divider.install = function(Vue) {
    Vue.component(Divider.name, Divider);
};

export default Divider;
