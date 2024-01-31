<!--
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-24 10:37:52
 * @LastEditTime: 2024-01-24 11:03:20
-->
<template>
    <div class="scroll-box">
        <bird-scrollbar>
            <div v-for="item in 200">{{ item }}</div>
        </bird-scrollbar>
    </div>
</template>

<script>
export default {
    name: "BirdScroll",
    mounted() {
        console.log("BirdButton");
    }
};
</script>

<style lang="less">
    .scroll-box {
        height: 400px;
    }
</style>
