<template>
    <i
        :class="svgClass"
        :style="inlineStyle"
        @mouseenter="enter"
        @mouseleave="leave"
    >
        <img
            v-if="showImg"
            class="svg-icon"
            :class="className"
            :style="style"
            :src="iconName"
        />
        <svg
            v-else
            class="svg-icon"
            :class="className"
            :style="style"
            aria-hidden="true"
        >
            <use :xlink:href="iconName"></use>
        </svg>
    </i>
</template>
<script>
export default {
    name: "BirdSvgIcon",
    props: {
        name: {
            type: String,
            default: ""
        },
        hover: {
            type: Boolean,
            default: false
        },
        hoverColor: {
            type: String,
            default: "var(--primary-color-light)"
        },
        width: {
            type: [Number, String],
            default: ""
        },
        height: {
            type: [Number, String],
            default: ""
        },
        fill: {
            type: String
        },
        type: {
            type: String
        },
        disabled: Boolean
    },
    data() {
        return {
            inlineStyle: {},
            w: this.width,
            h: this.height,
            f: this.fill
        };
    },
    computed: {
        iconName() {
            if (this.showImg) {
                return this.name;
            }
            return `#svg-${this.name}`;
        },
        showImg() {
            return (
                this.name.startsWith("https://") ||
                    this.name.startsWith("http://")
            );
        },
        className() {
            return `svg-${this.name}`;
        },
        style() {
            return {
                width: typeof this.w === "number" ? this.w + "px" : this.w,
                height: typeof this.h === "number" ? this.h + "px" : this.h,
                fill: this.f
            };
        },
        svgClass() {
            return [
                "bird-svg-icon",
                this.type ? "bird-svg-icon__" + this.type : "",
                { "is-disabled": this.disabled }
            ];
        }
    },
    watch: {
        width(val) {
            this.w = val;
        },
        height(val) {
            this.h = val;
        },
        fill(val) {
            this.f = val;
        }
    },
    methods: {
        enter() {
            if (this.hover) {
                this.inlineStyle = {
                    color: this.hoverColor
                };
            }
        },
        leave() {
            if (this.hover) {
                this.inlineStyle = {
                    color: "initial"
                };
            }
        }
    }
};
</script>
