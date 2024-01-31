<!--
 * @Author: 可以清心
 * @Description: BirdButton
 * @Date: 2024-01-16 20:43:23
 * @LastEditTime: 2024-01-22 09:53:01
-->
<template>
    <div class="wrapper">
        <div class="flex-wrapper">
            <div
                class="box"
                v-for="item in 10"
                :style="{
                    backgroundColor: `var(--primary-color-light-${item})`
                }"
            ></div>
        </div>
        <div class="flex-wrapper">
            <div
                class="box"
                v-for="item in 10"
                :style="{ backgroundColor: `var(--link-color-light-${item})` }"
            ></div>
        </div>
        <div class="flex-wrapper">
            <div
                class="box"
                v-for="item in 10"
                :style="{
                    backgroundColor: `var(--success-color-light-${item})`
                }"
            ></div>
        </div>
        <div class="flex-wrapper">
            <div
                class="box"
                v-for="item in 10"
                :style="{ backgroundColor: `var(--warn-color-light-${item})` }"
            ></div>
        </div>
        <div class="flex-wrapper">
            <div
                class="box"
                v-for="item in 10"
                :style="{ backgroundColor: `var(--error-color-light-${item})` }"
            ></div>
        </div>
        <div class="flex-wrapper">
            <div
                class="box"
                v-for="item in 10"
                :style="{ backgroundColor: `var(--gray-${item})` }"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BirdButton",
    mounted() {
        console.log("BirdButton");
    }
};
</script>

<style lang="less">
    .flex-wrapper {
        display: flex;
        margin-bottom: 10px;
        width: 100%;
        .box {
            width: 80px;
            height: 80px;
        }
    }
</style>
