import Exposure from "./exposure";
export default {
    install(Vue) {
        Vue.directive(Exposure.name, Exposure);
    }
};
