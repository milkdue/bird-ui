/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-12 18:52:22
 * @LastEditTime: 2026-04-18 14:00:30
 */
import Vue from "vue";
import App from "./App";
import directives from "./src/directives";
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
import {
    ModuleRegistry,
    ClientSideRowModelModule,
    CsvExportModule,
    InfiniteRowModelModule
} from "ag-grid-community";
import {
    RowGroupingModule,
    FiltersToolPanelModule,
    AdvancedFilterModule,
    MultiFilterModule,
    SetFilterModule,
    LicenseManager,
    MasterDetailModule
} from "ag-grid-enterprise";
import { AG_GRID_LOCALE_CN } from "@ag-grid-community/locale";
import UserDetailRenderer from "./user-detail-renderer.vue";
import "./src/assets/less/ag-grid.less";

ModuleRegistry.registerModules([
    RowGroupingModule,
    ClientSideRowModelModule,
    CsvExportModule,
    InfiniteRowModelModule,
    FiltersToolPanelModule,
    AdvancedFilterModule,
    MultiFilterModule,
    SetFilterModule,
    MasterDetailModule
]);
LicenseManager.setLicenseKey(
    "[v3][Release][0102]_MTcxNTc3NTcyODYxNg==cac543f10d0ab5a19b5f0ac12982a817"
);
AgGridVue.options.props.localeText = {
    type: Object,
    default: () => AG_GRID_LOCALE_CN
};
// --- ag-grid

Vue.component("bird-snippet", Snippet);
Vue.component("bird-nav-bar", NavBar);
Vue.component("bird-doc", DocPage);
Vue.component(AgGridVue.name, AgGridVue);
Vue.component("UserDetailRenderer", UserDetailRenderer);

Vue.use(BirdUI);
Vue.use(directives);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");

export default BirdUI;
