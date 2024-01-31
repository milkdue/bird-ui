/*
 * @Author: 可以清心
 * @Description: 入口文件
 * @Date: 2024-01-12 10:31:34
 * @LastEditTime: 2024-01-25 17:32:12
 */
import Row from "./components/row";
import Col from "./components/col";
import Scrollbar from "./components/scrollbar";

import "./index.less";

const components = [Row, Col, Scrollbar];

const install = function(Vue, opts = {}) {
    components.forEach(component => Vue.use(component));
};

export default {
    install
};
