<template>
    <button
        :class="buttonClass"
        :disabled="disabled || loading"
        v-on="$listeners"
    >
        <bird-svg-icon
            v-if="loading"
            class="loading-icon"
            name="loading"
            :width="getSize()"
            :height="getSize()"
        ></bird-svg-icon>
        <slot></slot>
    </button>
</template>

<script>
import BirdSvgIcon from "../../icon";
export default {
    name: "BirdButton",
    components: {
        BirdSvgIcon
    },
    props: {
        type: {
            type: String,
            default: "primary"
        },
        size: {
            type: String,
            default: "lg"
        },
        status: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        shape: {
            type: String
        },
        loading: {
            type: Boolean
        },
        block: {
            type: Boolean
        }
    },
    computed: {
        buttonClass() {
            const { type, size, status, shape, block, disabled, loading } =
                    this;
            let classList = [
                "bird-button",
                `bird-button--${type}`,
                `bird-button--${size}`
            ];

            if (status) {
                classList.push(`bird-button--${status}`);
            }

            if (shape) {
                classList.push(`bird-button--${shape}`);
            }

            if (block) {
                classList.push("bird-button--block");
            }

            if (disabled) {
                classList.push("bird-button--disabled");
            }

            if (loading) {
                classList.push("bird-button--loading");
            }

            return classList;
        }
    },
    methods: {
        getSize() {
            const size = this.size;
            switch (size) {
                case "sm":
                    return 12;
                case "md":
                case "lg":
                    return 16;
                case "xl":
                    return 16;
                default:
                    return 14;
            }
        }
    }
};
</script>
