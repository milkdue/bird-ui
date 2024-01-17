/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-16 11:57:41
 * @LastEditTime: 2024-01-16 12:04:41
 */
import navs from "@/router/config/designs.json";

const designRoutes = {
    path: "/design",
    name: "design",
    redirect: "/design/bird-design",
    component: () => import("@/views/Modules"),
    children: [
        {
            path: "bird-design",
            component: () => import("@/views/design/bird-design.md")
        },
        {
            path: "principle",
            component: () => import("@/views/design/principle.md")
        }
    ],
    meta: {
        navs
    }
};

export default designRoutes;
