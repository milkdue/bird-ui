<!--
 * @Author: 可以清心
 * @Description: docPage
 * @Date: 2024-02-04 13:38:04
 * @LastEditTime: 2024-02-04 16:13:59
-->
<template>
    <div ref="doc" class="bird-demo-doc">
        <div class="wrapper">
            <slot></slot>
        </div>
        <div ref="anchor" class="anchor-wrap">
            <bird-anchor
                v-if="scrollEl"
                :options="anchors"
                :scrollEl="scrollEl"
                scrollbar
                showMarker
            ></bird-anchor>
        </div>
    </div>
</template>

<script>
import { getParentByTag } from "../utils/dom.util";
export default {
    name: "DocPage",
    data() {
        return {
            anchors: [],
            scrollEl: null
        };
    },
    mounted() {
        const vm = getParentByTag(this, "bird-scrollbar");
        this.scrollEl = vm?.$refs.wrap || window;
        let anchors = [];
        const docNode = this.$refs.doc;
        const wrapperNode = docNode.children[0];
        const docH3 = wrapperNode.querySelectorAll("h3.snippet-title[id]");

        Array.from(docH3).forEach(el => {
            anchors.push({
                href: `#${el.id}`,
                title: el.id.replace(/-/g, " ")
            });
        });

        this.anchors = anchors;
    }
};
</script>

<style>
    .bird-demo-doc {
        --anchor-width: 212px;
        display: inline-block;
        width: 100%;
        .wrapper {
            float: left;
            width: calc(100% - var(--anchor-width));
        }
        .anchor-wrap {
            position: fixed;
            top: 88px;
            right: 0;
            float: left;
            margin-top: 88px;
            padding-right: 14px;
            padding-left: 56px;
            width: var(--anchor-width);
        }
    }
</style>
