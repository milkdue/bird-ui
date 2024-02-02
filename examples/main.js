/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-12 18:52:22
 * @LastEditTime: 2024-02-02 16:34:44
 */
import Vue from "vue";
import App from "./App";
import router from "./src/router";
import Snippet from "./src/components/Snippet.vue";
import NavBar from "./src/components/Navbar.vue";

// ----
import "../packages/styles/theme.less";
import "./src/assets/less/format.less";
import BirdUI from "../packages";
// ----

import "./src/assets/less/theme-variable.less";
import "normalize.css";

Vue.component("bird-snippet", Snippet);
Vue.component("bird-nav-bar", NavBar);

Vue.use(BirdUI);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
