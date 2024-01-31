<!--
 * @Author: 可以清心
 * @Description: App.vue
 * @Date: 2024-01-15 20:32:38
 * @LastEditTime: 2024-01-31 15:14:37
-->
<template>
    <div id="app">
        <top-bar></top-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
    name: "App",
    components: {
        TopBar
    }
};
</script>

<style lang="less">
    * {
        box-sizing: border-box;
    }
    body,
    #app {
        width: 100vw;
        height: 100vh;
    }
    body {
        overflow: hidden hidden;
    }
</style>
