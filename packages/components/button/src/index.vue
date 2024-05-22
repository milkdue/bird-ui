<template>
    <button :class="buttonClass" v-bind="$attrs">
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
export default {
    name: "BirdButton",
    props: {
        type: {
            type: String
        }
    },
    computed: {
        buttonClass() {
            const { type } = this;
            return ["bird-button", type ? `bird-button__${type}` : ""];
        }
    }
};
</script>
