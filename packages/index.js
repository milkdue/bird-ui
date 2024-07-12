/*
 * @Author: 可以清心
 * @Description: 入口文件
 * @Date: 2024-01-12 10:31:34
 * @LastEditTime: 2024-02-28 23:12:43
 */
import Row from "./components/row";
import Col from "./components/col";
import Scrollbar from "./components/scrollbar";
import Anchor from "./components/anchor";
import Divider from "./components/divider";
import Icon from "./components/icon";
import Button from "./components/button";
import Message from "./components/message";
import Link from "./components/link";

import "./index.less";

const components = [
    Row,
    Col,
    Scrollbar,
    Anchor,
    Divider,
    Icon,
    Message,
    Button,
    Link
];

const install = function(Vue, opts = {}) {
    components.forEach(component => Vue.use(component));
};

export default {
    install
};
