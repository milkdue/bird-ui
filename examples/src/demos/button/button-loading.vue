<template>
    <div style="display: flex; justify-content: space-around">
        <bird-button v-for="type in types" :key="type" :type="type" loading>
            {{ buttomMap[type] }}
        </bird-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            types: ["primary", "secondary", "plain"],
            buttomMap: {
                primary: "主要按钮",
                secondary: "次要按钮",
                plain: "朴素按钮"
            }
        };
    }
};
</script>
