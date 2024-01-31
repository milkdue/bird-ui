<!--
 * @Author: 可以清心
 * @Description: 自定义的滚动条
 * @Date: 2024-01-23 19:33:56
 * @LastEditTime: 2024-01-24 11:36:43
-->
<template>
    <transition name="bird-fade-in">
        <div v-show="show" :class="thumbClass">
            <div
                class="bird-scrollbar__thumb"
                :style="thumbStyle"
                @mousedown="handleThumbClick"
            ></div>
        </div>
    </transition>
</template>

<script>
export default {
    inject: ["scrollbarEl", "wrapEl"],
    props: {
        ratio: Number,
        size: String,
        always: Boolean,
        vertical: Boolean,
        move: Number
    },
    computed: {
        show() {
            const { visible, ratio, always, drag } = this;

            if (ratio === 1) {
                return false;
            }

            if (always) {
                return true;
            }

            return visible || drag;
        },
        thumbStyle() {
            const { vertical, size, move } = this;

            if (vertical) {
                return {
                    height: size,
                    transform: `translateY(${move}px)`
                };
            }

            return {
                width: size,
                transform: `translateX(${move}px)`
            };
        },
        thumbClass() {
            const { vertical } = this;

            return {
                "bird-scrollbar__bar": true,
                "bird-scrollbar__bar--vertical": vertical,
                "bird-scrollbar__bar--horizontal": !vertical
            };
        }
    },
    data() {
        return {
            visible: false,
            drag: false,
            mouseX: 0,
            mouseY: 0,
            scrollPos: 0,
            originalOnSelectStart: null
        };
    },
    mounted() {
        let { scrollbarEl } = this;
        scrollbarEl = scrollbarEl();

        this.originalOnSelectStart = document.onselectstart;

        const mousemove = () => (this.visible = true);
        const mouseleave = () => (this.visible = false);

        scrollbarEl.addEventListener("mousemove", mousemove);
        scrollbarEl.addEventListener("mouseleave", mouseleave);

        this.$once("hook:beforeDestroy", () => {
            scrollbarEl.removeEventListener("mousemove", mousemove);
            scrollbarEl.removeEventListener("mouseleave", mouseleave);
        });
    },
    methods: {
        handleThumbClick(event) {
            const { mouseMove, mouseUp } = this;
            event.stopPropagation();

            if (event.ctrlKey || [1, 2].includes(event.button)) return;

            this.drag = true;

            // window.getSelection() 用户选择的文本范围或光标的当前位置
            // see: https://juejin.cn/post/7314572755696681014
            window.getSelection()?.removeAllRanges();

            // 阻止监听同一事件的其他事件监听器被调用
            event.stopImmediatePropagation();

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            // 替换 onselectstart 事件
            // onselectstart几乎可以用于所有对象，其触发时间为目标对象被开始选中时（即选中动作刚开始，尚未实质性被选中）。该事件常使用于使目标对象“禁止变蓝”，比如在很多地方当用户双击时，一些元素会变成蓝色（选中状态），而当我们要避免这种情况时就可以使用该事件
            this.originalOnSelectStart = document.onselectstart;
            document.onselectstart = () => false;

            if (this.vertical) {
                this.scrollPos = this.wrapEl()?.scrollTop ?? 0;
            } else {
                this.scrollPos = this.wrapEl()?.scrollLeft ?? 0;
            }

            this.mouseY = event.screenY;
            this.mouseX = event.screenX;
        },
        mouseMove(event) {
            let { wrapEl } = this;

            wrapEl = wrapEl();

            if (!wrapEl) return;

            if (this.vertical) {
                const dis = event.screenY - this.mouseY;

                wrapEl.scrollTop =
                        this.scrollPos +
                        (dis * wrapEl.scrollHeight) / wrapEl.clientHeight;
            } else {
                const dis = event.screenX - this.mouseX;

                wrapEl.scrollLeft =
                        this.scrollPos +
                        (dis * wrapEl.scrollWidth) / wrapEl.clientWidth;
            }
        },
        mouseUp() {
            const { mouseMove, mouseUp, restoreOnselectstart } = this;
            this.drag = false;
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
            restoreOnselectstart();
        },
        restoreOnselectstart() {
            if (document.onselectstart !== this.originalOnSelectStart) {
                document.onselectstart = this.originalOnSelectStart;
            }
        }
    }
};
</script>
