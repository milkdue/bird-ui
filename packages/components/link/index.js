import Link from "./src";
import "../../styles/link/index.less";

Link.install = function(Vue) {
    Vue.component(Link.name, Link);
};

export default Link;
