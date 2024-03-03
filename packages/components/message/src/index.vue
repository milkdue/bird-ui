<template>
    <transition name="bird-message-fade" @after-leave="handleAfterLeave">
        <div
            v-show="visible"
            class="bird-message"
            role="alert"
            :style="style"
            @mouseenter="clearTimer"
            @mouseleave="startTimer"
        >
            <bird-svg-icon
                v-if="type && typeInfo"
                class="message-icon"
                :name="typeInfo.icon"
                :fill="typeInfo.fill"
                :width="16"
                :height="16"
            ></bird-svg-icon>
            <slot>
                <span v-if="!html">{{ message }}</span>
                <span v-else v-html="message"></span>
            </slot>
        </div>
    </transition>
</template>

<script>
import { isFunction } from "../../../utils/type.util";
const typeIcon = {
    info: {
        icon: "reminder",
        fill: "var(--primary-color-light)"
    },
    success: {
        icon: "tick2",
        fill: "var(--success-color-light)"
    },
    warning: {
        icon: "warning2",
        fill: "var(--warn-color-light)"
    },
    error: {
        icon: "cross2",
        fill: "var(--error-color-light)"
    },
    loading: {
        icon: "loading",
        fill: "var(--primary-color-light)"
    }
};
export default {
    name: "BirdMessage",
    data() {
        return {
            visible: false,
            message: "",
            duration: 3000,
            closed: false,
            timer: null,
            verticalOffset: 18,
            onClose: null,
            html: false
        };
    },
    computed: {
        style() {
            return {
                top: this.verticalOffset + "px"
            };
        },
        typeInfo() {
            return typeIcon[this.type];
        }
    },
    mounted() {
        this.startTimer();
    },
    methods: {
        handleAfterLeave() {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        },
        startTimer() {
            const { duration, closed, close } = this;

            if (duration) {
                this.timer = setTimeout(() => {
                    if (!closed) {
                        close();
                    }
                }, duration);
            }
        },
        clearTimer() {
            const { timer } = this;
            timer && clearTimeout(timer);
        },
        close() {
            this.closed = true;
            if (this.onClose && isFunction(this.onClose)) {
                this.onClose();
            }
            this.visible = false;
        }
    }
};
</script>
