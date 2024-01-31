<!--
 * @Author: 可以清心
 * @Description: 模版
 * @Date: 2024-01-16 11:08:28
 * @LastEditTime: 2024-01-31 16:12:30
-->
<template>
    <div class="modules">
        <bird-nav-bar :data="navs"></bird-nav-bar>
        <bird-scrollbar :key="$route.path" class="content">
            <router-view></router-view>
        </bird-scrollbar>
    </div>
</template>

<script>
export default {
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
        margin-top: @top-bar-height;
        .content {
            padding: 20px;
            width: calc(100% - @nav-bar-width);
            height: calc(100vh - @top-bar-height);
        }
    }
</style>
