/*
 * @Author: 可以清心
 * @Description: 路由配置
 * @Date: 2024-01-16 11:04:57
 * @LastEditTime: 2024-02-04 14:58:29
 */
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router.config";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: process.env.NODE_ENV === "development" ? "history" : "history",
    routes
});

export default router;
