/*
 * @Author: 可以清心
 * @Description: 注册 Row 组件
 * @Date: 2024-01-17 17:33:45
 * @LastEditTime: 2024-01-23 19:35:51
 */
import Row from "./src";
import "../../styles/row/index.less";

Row.install = function(Vue) {
    Vue.component(Row.name, Row);
};

export default Row;
