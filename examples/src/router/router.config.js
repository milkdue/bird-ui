/*
 * @Author: 可以清心
 * @Description: 路由配置文件
 * @Date: 2024-01-03 18:02:00
 * @LastEditTime: 2024-01-31 13:10:51
 */
// import designRoutes from "./modules/design";
import HomeView from "@/views/HomeView.vue";
import Modules from "@/views/Modules.vue";
import navs from "@/router/config/components.json";
import generalRoutes from "./modules/general";

const compModelRoute = {
    path: "/module",
    name: "module",
    redirect: "/module/layout",
    component: Modules,
    children: [...generalRoutes],
    meta: {
        navs
    }
};

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView
    },
    {
        path: "/develop",
        name: "develop",
        component: () => import("@/views/Development")
    },
    // designRoutes,
    compModelRoute
];

export default routes;
