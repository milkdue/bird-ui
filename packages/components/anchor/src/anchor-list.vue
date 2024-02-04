<!--
 * @Author: 可以清心
 * @Description: anchor-list组件
 * @Date: 2024-02-04 11:13:45
 * @LastEditTime: 2024-02-04 11:51:53
-->
<template>
    <ul :class="ulClass">
        <li v-for="item in options" :key="item.href" class="bird-anchor-item">
            <a
                :href="item.href"
                :class="linkClass(item)"
                @click="handleClick(item, $event)"
            ></a>
            <anchor-list
                v-if="item.children && item.children.length"
                :active="active"
                :options="item.children"
                @update-active="$emit(`updateActive`, $event)"
            ></anchor-list>
        </li>
    </ul>
</template>

<script>
export default {
    name: "AnchorList",
    props: {
        options: {
            type: Array,
            default: () => []
        },
        active: String,
        root: Boolean
    },
    computed: {
        ulClass() {
            let classList = ["bird-anchor-list"];

            if (this.root) {
                classList.push("bird-anchor-list-root");
            }

            return classList;
        },
        linkClass() {
            const active = this.active;
            return function(item) {
                let classList = ["bird-anchor-item-title"];

                if (active === item.href) {
                    classList.push("bird-anchor-item-title-active");
                }

                return classList;
            };
        }
    },
    methods: {
        handleClick(item, e) {
            window.history.pushState("", "", item.href);
            e.preventDefault();

            const el = document.querySelector(item.href);

            el?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }
};
</script>

<style lang="less"></style>
