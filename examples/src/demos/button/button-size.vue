<template>
    <div>
        <div
            v-for="type in types"
            :key="type"
            style="
                display: flex;
                justify-content: space-around;
                margin-bottom: 10px;
            "
        >
            <bird-button
                v-for="size in sizes"
                :key="size"
                :size="size"
                :type="type"
            >
                {{ buttomMap[type] }}
            </bird-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            types: ["primary", "secondary", "plain"],
            sizes: ["sm", "md", "lg", "xl"],
            buttomMap: {
                primary: "主要按钮",
                secondary: "次要按钮",
                plain: "朴素按钮"
            }
        };
    }
};
</script>
