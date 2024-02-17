<!--
 * @Author: 可以清心
 * @Description:
 * @Date: 2024-01-24 10:37:52
 * @LastEditTime: 2024-02-17 23:19:35
-->
<template>
    <div class="color-border">
        <div
            class="box"
            v-for="type in types"
            :style="{ border: `1px solid var(--line-color-${type})` }"
        >
            {{ `line-color-${type}` }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            types: ["xs", "md", "lg"]
        };
    }
};
</script>

<style lang="less" scoped>
    .color-border {
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
            &:hover {
                transform: scale(1.05);
            }
        }
    }
</style>
