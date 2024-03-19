<!--
 * @Author: 可以清心
 * @Description: color-assist
 * @Date: 2024-02-05 16:29:17
 * @LastEditTime: 2024-02-17 23:04:03
-->
<template>
    <div class="color-assist">
        <div class="color-series" v-for="type in types">
            <div class="box" v-for="num in 10" :style="boxStyle(type, num)">
                {{
                    type === "gray"
                        ? `${type}-${num}`
                        : `${type}-color-light-${num}`
                }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            types: ["link", "success", "warn", "error", "gray"]
        };
    },
    computed: {
        boxStyle() {
            return function(type, num) {
                let backgroundColor;
                if (type !== "gray") {
                    backgroundColor = `var(--${type}-color-light-${num})`;
                } else {
                    backgroundColor = `var(--${type}-${num})`;
                }

                return {
                    backgroundColor,
                    color: "white"
                };
            };
        }
    }
};
</script>

<style lang="less" scoped>
    .color-assist {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        width: 100%;
        .color-series {
            display: flex;
            flex-direction: column;
            width: 15%;
            .box {
                width: 100%;
                height: 40px;
                font-size: var(--size-xs);
                text-align: center;
                transition: transform var(--animats);
                line-height: 40px;
                &:hover {
                    transform: scale(1.05);
                }
                &:first-child {
                    border-radius: var(--radius-md) var(--radius-md) 0 0;
                }
                &:last-child {
                    border-radius: 0 0 var(--radius-md) var(--radius-md);
                }
            }
        }
    }
</style>
