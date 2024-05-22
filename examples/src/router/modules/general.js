/*
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-16 11:57:41
 * @LastEditTime: 2024-02-28 23:14:02
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
    }
];

export default generalRoutes;
