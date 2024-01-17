/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-12 18:52:22
 * @LastEditTime: 2024-01-17 09:46:04
 */
import Vue from "vue";
import App from "./App";
import router from "./src/router";
import Snippet from "@/components/Snippet.vue";

import "@/assets/less/theme-variable.less";
import "normalize.css";

Vue.component("bird-snippet", Snippet);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
