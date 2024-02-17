<!--
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-24 10:37:52
 * @LastEditTime: 2024-02-17 23:18:06
-->
<template>
    <div class="color-background">
        <div
            class="box"
            v-for="item in 4"
            :style="{
                backgroundColor: `var(--background-light-color-${item})`
            }"
        >
            {{ `background-light-color-${item}` }}
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
    .color-background {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        width: 100%;
        .box {
            width: 20%;
            height: 80px;
            font-size: var(--size-xs);
            border-radius: var(--radius-md);
            text-align: center;
            transition: transform var(--animats);
            line-height: 80px;
            &:first-child {
                border: 1px solid var(--line-color-md);
            }
            &:hover {
                transform: scale(1.05);
            }
        }
    }
</style>
