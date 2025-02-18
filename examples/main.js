/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-12 18:52:22
 * @LastEditTime: 2024-02-04 13:49:58
 */
import Vue from "vue";
import App from "./App";
import router from "./src/router";
import Snippet from "./src/components/Snippet.vue";
import NavBar from "./src/components/Navbar.vue";
import DocPage from "./src/components/DocPage.vue";

// ----
import "../packages/styles/theme.less";
import "./src/assets/less/format.less";
import BirdUI from "../packages";
// ----

import "./src/assets/less/theme-variable.less";
import "normalize.css";

// --- ag-grid
import { AgGridVue } from "ag-grid-vue";
import { ModuleRegistry } from "ag-grid-community";
import { RowGroupingModule } from "ag-grid-enterprise";
import "./src/assets/less/ag-grid.less";

ModuleRegistry.registerModules([RowGroupingModule]);
// --- ag-grid

Vue.component("bird-snippet", Snippet);
Vue.component("bird-nav-bar", NavBar);
Vue.component("bird-doc", DocPage);
Vue.component(AgGridVue.name, AgGridVue);

Vue.use(BirdUI);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");

export default BirdUI;
