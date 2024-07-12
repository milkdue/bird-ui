<template>
    <a
        :href="disabled ? undefined : href"
        :class="linkClass"
        :target="target"
        @click="clickLink"
    >
        <slot></slot>
        <span class="bird-link-anchor" v-if="isAnchor">
            <sup>#</sup>
        </span>
    </a>
</template>

<script>
export default {
    name: "BirdLink",
    props: {
        type: {
            type: String
        },
        href: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        underline: {
            type: Boolean
        },
        newTab: {
            type: Boolean
        }
    },
    computed: {
        linkClass() {
            const { disabled, underline, type } = this;
            let classList = ["bird-link"];

            if (disabled) {
                classList.push("bird-link__disabled");
            }

            if (underline && !disabled) {
                classList.push("bird-link__underline");
            }

            if (type) {
                classList.push(`bird-link__${type}`);
            }

            return classList;
        },
        target() {
            const { disabled, newTab } = this;

            if (!disabled && newTab) {
                return "_blank";
            }

            return "_self";
        },
        isAnchor() {
            return this.href.startsWith("#");
        }
    },
    methods: {
        clickLink() {
            this.$emit("click");
        }
    }
};
</script>
