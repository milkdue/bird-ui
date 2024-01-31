/*
 * @Author: 可以清心
 * @Description: 注册 Col 组件
 * @Date: 2024-01-22 16:23:56
 * @LastEditTime: 2024-01-31 18:08:34
 */
import Col from "./src";
import "../../styles/col/index.less";

Col.install = function(Vue) {
    Vue.component(Col.name, Col);
};

export default Col;
