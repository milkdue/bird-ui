/*
 * @Author: 可以清心
 * @Description: 入口文件
 * @Date: 2024-01-12 10:31:34
 * @LastEditTime: 2024-02-04 13:51:03
 */
import Row from "./components/row";
import Col from "./components/col";
import Scrollbar from "./components/scrollbar";
import Anchor from "./components/anchor";

import "./index.less";

const components = [Row, Col, Scrollbar, Anchor];

const install = function(Vue, opts = {}) {
    components.forEach(component => Vue.use(component));
};

export default {
    install
};
