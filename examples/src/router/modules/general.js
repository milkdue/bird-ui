/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-16 11:57:41
 * @LastEditTime: 2025-03-04 14:48:19
 */
const generalRoutes = [
    {
        path: "layout",
        component: () => import("@/demos/layout/doc.md")
    },
    {
        path: "divider",
        component: () => import("@/demos/divider/doc.md")
    },
    {
        path: "color",
        component: () => import("@/demos/color/doc.md")
    },
    {
        path: "icon",
        component: () => import("@/demos/icon/doc.md")
    },
    {
        path: "button",
        component: () => import("@/demos/button/doc.md")
    },
    {
        path: "link",
        component: () => import("@/demos/link/doc.md")
    },
    {
        path: "step",
        component: () => import("@/demos/step/doc.md")
    },
    {
        path: "column",
        component: () => import("@/demos/grid/column/doc.md")
    },
    {
        path: "row",
        component: () => import("@/demos/grid/row/doc.md")
    },
    {
        path: "drag",
        component: () => import("@/demos/grid/drag/doc.md")
    }
];

export default generalRoutes;
