import Button from "./src";
import "../../styles/button/index.less";

Button.install = function(Vue) {
    Vue.component(Button.name, Button);
};

export default Button;
