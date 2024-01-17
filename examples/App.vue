<!--
 * @Author: 可以清心
 * @Description: App.vue
 * @Date: 2024-01-15 20:32:38
 * @LastEditTime: 2024-01-17 16:14:54
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
    },
    mounted() {
        console.info(1111);
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
</style>
