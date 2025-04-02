<!--
 * @Author: 可以清心
 * @Description: 模版
 * @Date: 2024-01-16 11:08:28
 * @LastEditTime: 2025-03-13 18:51:47
-->
<template>
    <div class="modules">
        <bird-nav-bar :data="navs"></bird-nav-bar>
        <bird-scrollbar :key="$route.path" class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </bird-scrollbar>
    </div>
</template>

<script>
export default {
    name: "BirdModule",
    computed: {
        navs() {
            return (
                this.$route.meta.navs ||
                    (this.$route.matched.length &&
                        this.$route.matched[0].meta.navs)
            );
        }
    }
};
</script>

<style lang="less">
    .modules {
        display: flex;
        padding-top: @top-bar-height;
        .content {
            padding: 20px;
            width: calc(100% - @nav-bar-width);
            height: calc(100vh - @top-bar-height);
        }
    }
</style>
