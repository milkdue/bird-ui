<!--
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-17 16:59:05
 * @LastEditTime: 2024-01-31 13:09:07
-->
<template>
    <div class="top-bar">
        <router-link class="logo" to="/">
            <img src="@/assets/svgs/logo.svg" />
            <span class="title">Bird-UI</span>
        </router-link>
        <div class="nav-links">
            <router-link
                v-for="(link, path) in navLinks"
                :key="path"
                :to="path"
                class="nav-item"
            >
                {{ link }}
            </router-link>
            <a class="nav-item" :href="links.home" target="_blank">博客</a>
            <a class="nav-item" :href="links.github" target="_blank">
                <img src="@/assets/svgs/github.svg" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopBar",
    data() {
        return {
            navLinks: {
                "/": "首页",
                "/develop": "开发",
                // "/design": "设计",
                "/module": "组件"
            },
            links: {
                home: "https://blog.keyiqingxin.cn",
                github: "https://github.com/milkdue/bird-ui/",
                devStandard: "",
                task: ""
            }
        };
    }
};
</script>

<style lang="less" scoped>
    .top-bar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        width: 100%;
        height: @top-bar-height;
        border-bottom: 1px solid rgb(@gray 0.08);
        background-color: #fff;
        transition: all 0.3s;
        a {
            text-decoration: none;
        }
        .logo {
            display: flex;
            align-items: center;
            img {
                width: 36px;
                height: 36px;
            }
            .title {
                margin-left: 8px;
                font-size: 28px;
                font-family: Apalu, serif;
                font-weight: 700;
                color: rgb(@gray);
                line-height: @top-bar-height;
            }
        }
        .nav-links {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 24px;
            .nav-item {
                padding: 5px 8px;
                border-radius: 4px;
                color: rgb(@gray);
                img {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>
