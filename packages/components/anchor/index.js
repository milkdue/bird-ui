import Anchor from "./src/anchor.vue";
import "../../styles/anchor/index.less";

Anchor.install = function(Vue) {
    Vue.component(Anchor.name, Anchor);
};

export default Anchor;
