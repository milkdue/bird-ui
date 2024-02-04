import Anchor from "./src";
import "../../styles/anchor/index.less";

Anchor.install = function(Vue) {
    Vue.component(Anchor.name, Anchor);
};

export default Anchor;
