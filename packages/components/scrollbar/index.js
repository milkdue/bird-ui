/*
 * @Author: 可以清心
 * @Description: 注册 Scrollbar 组件
 * @Date: 2024-01-17 17:33:45
 * @LastEditTime: 2024-01-24 10:49:36
 */
import Scrollbar from "./src/index.vue";
import "../../styles/scrollbar/index.less";

Scrollbar.install = function(Vue) {
    Vue.component(Scrollbar.name, Scrollbar);
};

export default Scrollbar;
