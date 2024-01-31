/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-16 11:57:41
 * @LastEditTime: 2024-01-31 13:11:26
 */
const generalRoutes = [
    {
        path: "layout",
        component: () => import("@/demos/layout/doc.md")
    },
    {
        path: "color",
        component: () => import("@/demos/color/doc.md")
    }
];

export default generalRoutes;
