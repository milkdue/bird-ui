<!--
 * @Author: 可以清心
 * @Description: Scrollbar 组件
 * @Date: 2024-01-23 17:03:22
 * @LastEditTime: 2024-02-04 16:12:50
-->
<template>
    <div ref="scrollbar" class="bird-scrollbar">
        <div ref="wrap" :class="wrapClass" @scroll="handleScroll">
            <div ref="content" class="bird-scrollbar__content">
                <slot></slot>
            </div>
        </div>
        <template v-if="!native">
            <bird-thumb
                vertical
                :size="thumbHeight"
                :move="moveY"
                :always="always"
                :ratio="ratioY"
            ></bird-thumb>
            <bird-thumb
                :size="thumbWidth"
                :move="moveX"
                :always="always"
                :ratio="ratioX"
            ></bird-thumb>
        </template>
    </div>
</template>

<script>
import BirdThumb from "./thumb.vue";

const GAP = 4;

export default {
    name: "BirdScrollbar",
    components: {
        BirdThumb
    },
    provide() {
        return {
            scrollbarEl: this.scrollbarEl,
            wrapEl: this.wrapEl
        };
    },
    props: {
        native: {
            type: Boolean,
            default: false
        },
        always: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        wrapClass() {
            const { native } = this;

            return {
                "bird-scrollbar__wrap": true,
                "bird-scrollbar__wrap--default-hide": !native
            };
        }
    },
    data() {
        return {
            moveY: 0,
            moveX: 0,
            ratioX: 1,
            ratioY: 1,
            thumbWidth: "0",
            thumbHeight: "0"
        };
    },
    mounted() {
        const { handleResize } = this;
        const slots = this.$slots.default;
        handleResize();

        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        resizeObserver.observe(this.$el);
        slots && slots.forEach(el => resizeObserver.observe(el.elm));

        this.$once("hook:beforeDestroy", () => {
            resizeObserver.unobserve(this.$el);
            slots && slots.forEach(el => resizeObserver.unobserve(el.elm));
        });
    },
    methods: {
        handleScroll(event) {
            const wrap = this.$refs.wrap;
            const content = this.$refs.content;

            if (!wrap || !content) return;

            // 真实宽度需要减去滚动条的宽度 才是真正的宽度，这是因为滚动条是模拟出来的 原生的滚动条不存在这个问题
            const offsetHeight = wrap.offsetHeight - GAP;
            const offsetWidth = wrap.offsetWidth - GAP;

            // 计算比例，因为最终显示的还是容器的宽度，内容的宽度会被隐藏，但它实际的宽度或高度远远超过了容器的宽度和高度
            // 计算公式应该为 垂直或水平滚动的像素数 / 内容的滚动高度或内容的滚动宽度 * 容器的宽度
            this.moveY =
                    (wrap.scrollTop * offsetHeight) / content.scrollHeight;
            this.moveX =
                    (wrap.scrollLeft * offsetWidth) / content.scrollWidth;

            this.$emit("scroll", event);
        },
        handleResize() {
            const wrap = this.$refs.wrap;

            if (!wrap) return;

            const offsetHeight = wrap.offsetHeight;
            const offsetWidth = wrap.offsetWidth;

            // visableHeight 和 offsetHeight 相同
            // 计算滚动条的高度或宽度
            // visableHeight * offsetHeight / scrollHeight
            const ogH = offsetHeight ** 2 / wrap.scrollHeight;
            const ogW = offsetWidth ** 2 / wrap.scrollWidth;

            this.thumbHeight = ogH + "px";
            this.thumbWidth = ogW + "px";

            this.ratioX = ogW / offsetWidth;
            this.ratioY = ogH / offsetHeight;

            this.moveX = (wrap.scrollLeft * offsetWidth) / wrap.scrollWidth;
            this.moveY =
                    (wrap.scrollTop * offsetHeight) / wrap.scrollHeight;
        },
        scrollbarEl() {
            return this.$refs.scrollbar;
        },
        wrapEl() {
            return this.$refs.wrap;
        }
    }
};
</script>
