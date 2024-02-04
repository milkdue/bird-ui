<!--
 * @Author: 可以清心
 * @Description: anchor 组件
 * @Date: 2024-02-04 11:13:52
 * @LastEditTime: 2024-02-04 12:44:10
-->
<template>
    <bird-scroll-bar v-if="scrollbar" v-bind="scrollbar">
        <div ref="anchor" :class="classList">
            <anchor-list
                :active="active"
                :options="options"
                :root="true"
                @update-active="active = $event"
            >
                <span
                    v-if="showMarker && markerY !== undefined"
                    class="bird-anchor-marker"
                    :style="markerStyle"
                ></span>
            </anchor-list>
        </div>
    </bird-scroll-bar>
    <div v-else ref="anchor" class="classList">
        <anchor-list
            :active="active"
            :options="options"
            :root="true"
            @update-active="active = $event"
        >
            <span
                v-if="showMarker && markerY !== undefined"
                class="bird-anchor-marker"
                :style="markerStyle"
            ></span>
        </anchor-list>
    </div>
</template>

<script>
import AnchorList from "./anchor-list.vue";
import { debounce } from "../../../utils/common.util";

export default {
    name: "BirdAnchor",
    components: {
        AnchorList
    },
    props: {
        showMarker: {
            type: Boolean,
            default: true
        },
        scrollEl: {
            type: Object,
            default: window
        },
        offset: {
            type: Number,
            default: 0
        },
        ms: {
            type: Number,
            default: 50
        },
        scrollbar: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        classList() {
            let classList = ["bird-anchor"];

            if (this.showMarker) {
                classList.push("bird-anchor-show-marker");
            }

            return classList;
        },
        markerStyle() {
            const { active, markerY } = this;
            return (
                active && {
                    top: `${markerY}px`,
                    opacity: 1
                }
            );
        }
    },
    data() {
        return {
            active: "",
            markerY: 0,
            anchorList: [],
            anchorEls: [],
            debounceHandleScroll: debounce(this.handleScroll, this.ms)
        };
    },
    watch: {
        active: {
            async handler() {
                await this.$nextTick();
                this.handleMarkerPos();
            },
            immediate: true
        }
    },
    mounted() {
        let unwatch = this.$watch(
            () => this.options,
            async v => {
                if (v) {
                    await this.$nextTick();
                    this.anchorList = this.treeToList(this.options);
                    unwatch();
                }
            }
        );

        this.getEl();

        this.$once("hook:beforeDestroy", () => {
            this.scrollEl?.().removeEventListener(
                "scroll",
                this.debounceHandleScroll
            );
        });
    },
    methods: {
        async handleMarkerPos() {
            const { showMarker, active } = this;

            if (!showMarker || !active) return;

            await this.$nextTick();

            const activeEl = this.$refs.anchor.querySelector(
                ".bird-anchor-item-title-active"
            );

            if (!activeEl) return;

            this.markerY = activeEl.offsetTop;
        },
        treeToList(options) {
            const { treeToList } = this;
            const arr = [];

            options.forEach(item => {
                arr.push(item);
                if (item.children && item.children.length) {
                    arr.push(...treeToList(item.children));
                }
            });

            return arr;
        },
        getEl() {
            const { scrollEl } = this;
            const scrollContainer = scrollEl?.();

            if (!scrollContainer) return;

            if (scrollContainer instanceof Window) {
                this.anchorList.forEach(a => {
                    const target = document.querySelector(a.href);

                    if (!target) return;
                    this.anchorEls.push(target);
                });
            } else {
                this.anchorList.forEach(a => {
                    const target = scrollContainer.querySelector(a.href);

                    if (!target) return;
                    this.anchorEls.push(target);
                });
            }

            this.scrollEl?.().addEventListener(
                "scroll",
                this.debounceHandleScroll
            );
        },
        handleScroll() {
            const { anchorEls, scrollEl, offset } = this;

            if (anchorEls.length === 0) {
                this.getEl();
            }

            const scrollContainer = scrollEl?.();

            if (!scrollContainer || anchorEls.length === 0) return;
            const distances = [];

            if (scrollContainer instanceof Window) {
                anchorEls.forEach((item, index) => {
                    const rect = item?.getBoundingClientRect();
                    distances[index] = {
                        dis: rect.top - rect.height - offset,
                        el: item
                    };
                });

                let closeEl;

                for (const iterator of distances) {
                    if (
                        iterator.dis >= 0 &&
                            (!closeEl || iterator.dis < closeEl.dis)
                    ) {
                        closeEl = iterator;
                    }
                }

                if (closeEl?.el) {
                    this.active = `#${closeEl?.el.id}`;
                } else {
                    this.active = `#${distances[distances.length - 1].el.id}`;
                }
            } else {
                const scrollContainerTop =
                        scrollContainer.getBoundingClientRect().top;

                anchorEls.forEach((item, index) => {
                    const rect = item.getBoundingClientRect();
                    const dis = rect.top - scrollContainerTop;

                    distances[index] = {
                        dis: dis - offset,
                        el: item
                    };
                });

                let closeEl = distances[0];

                for (const iterator of distances) {
                    if (iterator.el.id === closeEl?.el.id) continue;
                    if (iterator.dis < 0 && iterator.dis > closeEl?.dis) {
                        closeEl = iterator;
                    }
                }

                this.active = `#${closeEl?.el.id}`;
            }
        }
    }
};
</script>

<style></style>
